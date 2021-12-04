const express = require("express");
const passport = require("passport");
const upload = require("../../middlewares/multer");
const { fetchList, createService, updateService } = require("./controllers");

const router = express.Router();

// Param Middleware
router.param("serviceId", async (req, res, next, serviceId) => {
    const service = await fetchList(serviceId, next);
    if (service) {
      req.service = service;
      next();
    } else {
      next({ status: 404, message: "service Not Found!" });
    }
  });
  

router.get("/", fetchList);

router.post(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createService
);

router.put(
  `/dashboard/:serviceId`,
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateService
);

module.exports = router;
