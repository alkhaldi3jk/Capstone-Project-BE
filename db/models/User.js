const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    // required: true,
    // unique: true,
  },

  profile:{
    name: { type: String },
    age: { type: Number },
    image: { type: String },
  },
  owner: {type: mongoose.Schema.Types.ObjectId, ref:"User"}

});

module.exports = model("User", UserSchema);
