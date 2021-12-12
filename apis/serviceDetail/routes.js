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
  if (detail) {
    req.Detail = detail;
    next();
  } else {
    next({ status: 404, message: "Detail Not Found!" });
  }
});

router.get("", detailListFetch);
router.get("", detailFetch);
router.get(
  "/:detailId",
  passport.authenticate("jwt", { session: false }),
  serviceDetailFetch
);


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
