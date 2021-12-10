const express = require("express");
const passport = require("passport");
const Appointment = require("../../db/models/Appointment");
const {
  fetchAppointment,
  createAppointment,
  updateAppointment,
  fetchAppointmentList,
  deleteAppointment,
  appointmentDetailFetch,
} = require("./controllers");

const router = express.Router();

// Param Middleware
router.param("appointmentId", async (req, res, next, appointmentId) => {
  const appointment = await fetchAppointment(appointmentId, next);
  if (appointment) {
    req.Appointment = appointment;
    next();
  } else {
    next({ status: 404, message: "appointment Not Found!" });
  }
});

router.get("", fetchAppointmentList);
router.get("", fetchAppointment);

router.get("/:appointmentId", appointmentDetailFetch);

router.post(
  "",
  passport.authenticate("jwt", { session: false }),
  createAppointment
);

router.put(
  "/:appointmentId",
  passport.authenticate("jwt", { session: false }),
  updateAppointment
);

router.delete(
  "/:appointmentId",
  passport.authenticate("jwt", { session: false }),
  deleteAppointment
);

module.exports = router;
