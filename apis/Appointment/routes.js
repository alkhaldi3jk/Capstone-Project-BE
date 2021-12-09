const express = require("express");
const passport = require("passport");
const upload = require("../../middlewares/multer");
const {
    appointments,
  createAppointment,
  updateAppointment,
  fetchAppointment,
  deleteAppointment,
} = require("./controllers");

const router = express.Router();

// Param Middleware
// router.param("appointmentId", async (req, res, next, appointmentId) => {
//   const appointment = await fetchAppointment(appointmentId, next);
//   if (appointment) {
//     req.appointment = appointment;
//     next();
//   } else {
//     next({ status: 404, message: "appointment Not Found!" });
//   }
// });

// router.get("/", fetchAppointment);

router.post(
  "/appointments",
  passport.authenticate("jwt"), appointments),
//   upload.single("image")

// router.put(
//   "/dashboard/:appointmentId",
//   passport.authenticate("jwt", { session: false }),
// //   upload.single("image"),
//   updateAppointment
// );

// router.delete(
//   "/dashboard/:appointmentId",
//   passport.authenticate("jwt", { session: false }),
//   deleteAppointment
// );

module.exports = router;