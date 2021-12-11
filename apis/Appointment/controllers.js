const Appointment = require("../../db/models/Appointment");

exports.fetchAppointmentList = async (req, res, next) => {
  try {
    const appointment = await Appointment.find();
    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
  }
};

exports.fetchAppointment = async (appointmentId, next) => {
  try {
    const appointment = await Appointment.findById(appointmentId);
    return appointment;
  } catch (error) {
    console.log(error);
  }
};
exports.appointmentDetailFetch = async (req, res, next) => {
  try {
    console.log("appointment", req.Appointment);

    res.status(200).json(req.Appointment);
  } catch (error) {
    console.log(error);
  }
};

exports.createAppointment = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;

    req.body.user = req.user._id;
    const newAppointment = await Appointment.create(req.body);
    res.status(201).json(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

exports.updateAppointment = async (req, res, next) => {
  try {
    if (req.user) {
      req.body.owner = req.user._id;
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.Appointment,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json(updatedAppointment);
    } else {
      res.status(401).res.json({ message: "You are Not The Admin" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteAppointment = async (req, res, next) => {
  try {
    if (req.user._id) {
      req.body.owner = req.user._id;
      await req.Appointment.remove();
      res.status(204).end();
    } else {
      res.status(401).json({ message: "You are Not a user" });
    }
  } catch (error) {
    console.log(error);
  }
};
