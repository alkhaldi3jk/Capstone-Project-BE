const express = require("express");
const passport = require("passport");
const upload = require("../../middlewares/multer");
const {
  fetchList,
  fetchService,
  createService,
  updateService,
  serviceFetchId,
  deleteService,
  createServiceOption,
} = require("./controllers");

const router = express.Router();

// Param Middleware
router.param("serviceId", async (req, res, next, serviceId) => {
  const service = await fetchService(serviceId, next);
  if (service) {
    req.service = service;
    next();
  } else {
    next({ status: 404, message: "Service Not Found!" });
  }
});

router.get("", fetchList);

router.get("/:serviceId", serviceFetchId);

router.post(
  "",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createService
);
router.post(
  "/:serviceId/options",
  passport.authenticate("jwt", { session: false }),
  createServiceOption
);

router.put(
  "/:serviceId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateService
);

router.delete(
  "/:serviceId",
  passport.authenticate("jwt", { session: false }),
  deleteService
);

module.exports = router;
