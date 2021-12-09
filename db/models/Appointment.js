const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const AppointmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        service: { type: Schema.Types.ObjectId, ref: "Service" },
        // quantity: { type: Number, min: 1 },
      

    // from:{type:Number,min:1}
  },
    ],
  
}

)

module.exports = model("Appointment", AppointmentSchema);
