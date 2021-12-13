const express = require("express");
const passport = require("passport");
const {
  optionListFetch,
  serviceOptionFetch,
  optionUpdate,
  optionDelete,
  optionFetch,
} = require("./controllers");

const router = express.Router();

// Param Middleware
router.param("optionId", async (req, res, next, optionId) => {
  const option = await optionFetch(optionId, next);
  console.log(optionId);
  if (option) {
    req.option = option;
    next();
  } else {
    console.log("error");
    next({ status: 404, message: "Option Not Found!" });
  }
});

router.get("", optionListFetch);
router.get("/:optionId", serviceOptionFetch);

router.put(
  "/:optionId",
  passport.authenticate("jwt", { session: false }),
  optionUpdate
);

router.delete(
  "/:optionId",
  passport.authenticate("jwt", { session: false }),
  optionDelete
);

module.exports = router;
