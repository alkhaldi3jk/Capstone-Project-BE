const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  subtitle: { type: String },
  // REVIEW: Since you have a Service Detail page in your web, you need a slug right?
  //   appointment: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Appointment",
  //     },
  //   ],
});

module.exports = model("Service", ServiceSchema);
