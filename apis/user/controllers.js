const User = require("../../db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    isAdmin: user.isAdmin,
    profile: user.profile,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS, // number in milliseconds
  };

  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;

    // req.body.profile = null;
    const newUser = await User.create(req.body);
    await newUser.populate("requests");

    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    // passport passed user through req.user
    const token = await generateToken(req.user);
    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};

exports.fetchUsers = async (req, res, next) => {
  try {
    // REVIEW: If you're fetching users, you need to remove the password field
    const usersList = await User.find().populate("requests");
    res.status(200).json(usersList);
  } catch (error) {
    console.log(error);
  }
};

exports.userFetch = async (req, res, next) => {
  try {
    const oneUser = await User.findById(req.user._id).populate("requests");
    // return oneUser;
    res.status(200).json(oneUser);
  } catch (error) {
    console.log(error);
  }
};



exports.updateProfile = async (req, res, next) => {
  try {
    console.log("this is the call");
    if (req.file) {
      req.body.image = `/${req.file.path}`;
    }
    const updateprofile = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { profile: req.body } },
      { new: true, runValidators: true } // returns the updated profile
      // REVIEW: You need to remove the password before sending the response
    );
    res.status(200).json(updateprofile);
  } catch (error) {
    console.log(error);
  }
};
