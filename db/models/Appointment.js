const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const AppointmentSchema = new Schema({
  service: { type: Schema.Types.ObjectId, ref: "Service" },
  from: { type: Number, min: 1 },
  to: { type: Number, min: 1 },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//     request: [
//       {
//         service: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
//       },
//     ],
//   },
//   { timeStamps: true }
// );

module.exports = model("Appointment", AppointmentSchema);
