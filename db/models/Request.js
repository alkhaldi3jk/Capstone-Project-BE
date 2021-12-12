const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const RequestSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        detail: { type: mongoose.Schema.Types.ObjectId, ref: "Detail" },
      },
    ],
  },
  { timeStamps: true }
);

module.exports = model("Request", RequestSchema);
