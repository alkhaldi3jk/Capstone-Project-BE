const express = require("express");
const passport = require("passport");
const upload = require("../../middlewares/multer");
const {
  fetchList,
  createService,
  updateService,
  fetchService,
  serviceDetailFetch,
  deleteService,
} = require("./controllers");

const router = express.Router();

// Param Middleware
router.param("serviceId", async (req, res, next, serviceId) => {
  const service = await fetchService(serviceId, next);
  if (service) {
    req.service = service;
    next();
  } else {
    // REVIEW: Service not service
    next({ status: 404, message: "service Not Found!" });
  }
});
// REVIEW: Naming convention for all your routes: Remove /dashboard, /services is enough. The backend doesn't care where you're using this route

router.get("/", fetchList);
router.get("/", fetchService);
router.get("/dashboard/:serviceId", serviceDetailFetch);

router.post(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createService
);

router.put(
  "/dashboard/:serviceId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateService
);

router.delete(
  "/dashboard/:serviceId",
  passport.authenticate("jwt", { session: false }),
  deleteService
);

module.exports = router;
