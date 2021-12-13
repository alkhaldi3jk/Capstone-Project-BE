const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  request: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],

  profile: {
    address: [
      {
        name: { type: String },
        street: { type: Number },
        block: { type: Number },
        house: { type: Number },
      },
    ],
    name: { type: String },
    age: { type: Number },
    image: { type: String },
  },
});

module.exports = model("User", UserSchema);
