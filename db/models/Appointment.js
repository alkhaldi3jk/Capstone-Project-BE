const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const AppointmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
      
        service: { type: Schema.Types.ObjectId, ref: "Service" },
    from:{type:Number,min:1},
    to :{type:Number,min:1}
  
  
}

)

module.exports = model("Appointment", AppointmentSchema);
