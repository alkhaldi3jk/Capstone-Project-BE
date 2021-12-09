const express = require("express");
const passport = require("passport");
const { signup, signin, fetchUsers, updateProfile } = require("./controllers");
const upload = require("../../middlewares/multer");

// Create a mini express application
const router = express.Router();

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.get("/users", fetchUsers);

router.put(
  "/users",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateProfile
);

module.exports = router;
