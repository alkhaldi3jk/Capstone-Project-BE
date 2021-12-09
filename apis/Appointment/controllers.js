const Appointment = require("../../db/models/Appointment");


exports.appointments = async (req,res,next) => {
  try {
            req.body.user = req.user._id;
    const newAppointment = await Appointment.create(req.body);
      res.status(201).json(newAppointment);
} catch (error) {
    next(error);
  }
};


exports.updateAppointment = async (req, res, next) => {
  try {
      if (req.file) {
        req.body.image = `/${req.file.path}`;      }
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.Service,
        req.body,
        {
          new: true,
          runValidators: true,
        })
        res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};

exports.deleteAppointment = async (req, res, next) => {
  try {
    if (req.user === true) {
      await req.Appointment.remove();
      res.status(204).end();
    } else {
      res.status(401).json({ message: "You are Not a user" });
    }
  } catch (error) {
    next(error);
  }
};

