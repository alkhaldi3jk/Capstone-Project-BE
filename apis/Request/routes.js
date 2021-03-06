const express = require("express");
const passport = require("passport");
const {
  fetchRequest,
  createRequest,
  updateRequest,
  fetchRequestList,
  deleteRequest,
  requestOptionFetch,
  checkout,
} = require("./controllers");

const router = express.Router();

// Param Middleware
router.param("requestId", async (req, res, next, requestId) => {
  const request = await fetchRequest(requestId, next);
  if (request) {
    req.request = request;
    next();
  } else {
    next({ status: 404, message: "Request Not Found!" });
  }
});

router.get("", fetchRequestList);

router.get("/:requestId", requestOptionFetch);

// router.post(

//   "",

//   passport.authenticate("jwt", { session: false }),
//   createRequest
// );

router.put(
  "/:requestId",
  passport.authenticate("jwt", { session: false }),
  updateRequest
);

router.delete(
  "/:requestId",
  passport.authenticate("jwt", { session: false }),
  deleteRequest
);

router.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  checkout
);

module.exports = router;
