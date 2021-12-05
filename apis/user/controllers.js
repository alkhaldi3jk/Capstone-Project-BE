const User = require("../../db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

const generateToken = (user) => {
  const payload = {
    _id: user._id,
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

    const newUser = await User.create(req.body)
    await newUser.populate('profile')
    // console.log(newUser);
    // req.body.owner = req.user._id;
    // const newProfile = await Useer.Profile.create(req.body);
    // console.log(newProfile);

    const token = generateToken(newUser);

    res.status(201).json({ token, newUser });
  } catch (error) {
    next(error);
  }
};

exports.signin = async(req, res, next) => {
try{  // passport passed user through req.user
  const token = await generateToken(req.user);
  res.json({ token });
}catch(error){
  console.log(error)
}}

exports.fetchUsers=async (req,res,next)=>{
    try {
        const usersList = await User.find()
        res.status(200).json(usersList)
    } catch (error) {
        console.log(error)
    }
}
// exports.updateProfile=async(req,res,next)=>{
// try{
//   req.body.owner=req.user._id
//   const updateprofile = await profile.findByIdAndUpdate(
//     req.profile,
//     req.body,
//     { new: true, runValidators: true } // returns the updated profile
//   ).populate("");
//    res.status(200).json(updateprofile);
// } catch (error) {
//   console.log(error)
// }
// }