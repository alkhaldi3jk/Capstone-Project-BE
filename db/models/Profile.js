const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: { type: String },
    slug: { type: String },
    age: { type: Number },
    image: { type: String },
    trips: { type: String },
    bio: { type: String },
    hobbies: { type: [String] },

  },
  { timeStamps: true }
);


module.exports = mongoose.model("Profile", ProfileSchema);