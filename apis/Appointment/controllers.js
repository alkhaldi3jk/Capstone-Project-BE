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
    if (req.user === true) {
      if (req.file) {
        req.body = `http://${req.get("host")}/${req.file.filename}`;
      }
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.appointment,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      ); /// I saw this in the past code but I didn't know for what
      // please Abdallah ASK, if you see this remind me to ask
      res.status(200).json(updatedAppointment);
    } else {
      res.status(401).res.json({ message: "You are Not a user" });
    }
  } catch (error) {
    next(error);
  }
};

// exports.deleteAppointment = async (req, res, next) => {
//   try {
//     if (req.user === true) {
//       await req.appointment.remove();
//       res.status(204).end();
//     } else {
//       res.status(401).json({ message: "You are Not a user" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

