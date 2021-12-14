const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const RequestSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    option: { type: mongoose.Schema.Types.ObjectId, ref: "Option" },
  },
  { timeStamps: true }
);

module.exports = model("Request", RequestSchema);
