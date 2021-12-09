const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const AppointmentSchema = new Schema(
  {
    user: {

      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    request: [
      {
        service: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
      },
    ],
  },
  { timeStamps: true }
);


module.exports = model("Appointment", AppointmentSchema);
