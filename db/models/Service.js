const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
});

module.exports = model("Service", ServiceSchema);
