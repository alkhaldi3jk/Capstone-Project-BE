const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        // quantity: { type: Number, min: 1 },
      },
    ],
  },
  { timeStamps: true }
);

module.exports = model("Order", OrderSchema);
