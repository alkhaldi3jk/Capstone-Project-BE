const express = require("express");
const passport = require("passport");
const {
  detailListFetch,
  serviceDetailFetch,
  detailUpdate,
  detailDelete,
  detailFetch,
} = require("./controllers");

const router = express.Router();

// Param Middleware
router.param("detailId", async (req, res, next, detailId) => {
  const detail = await detailFetch(detailId, next);
  console.log(detailId);
  if (detail) {
    req.detail = detail;
    next();
  } else {
    console.log("error");
    next({ status: 404, message: "Detail Not Found!" });
  }
});

router.get("", detailListFetch);
router.get("/:detailId", serviceDetailFetch);

router.put(
  "/:detailId",
  passport.authenticate("jwt", { session: false }),
  detailUpdate
);

router.delete(
  "/:detailId",
  passport.authenticate("jwt", { session: false }),
  detailDelete
);

module.exports = router;
