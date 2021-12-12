const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const DetailSchema = new Schema(
  {
    name: { type: String },
    date: { type: Date },
    from: { type: Number },
    to: { type: Number },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Detail", DetailSchema);
