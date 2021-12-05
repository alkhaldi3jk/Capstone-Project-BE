const express = require("express");
const passport = require("passport");
const { signup, signin, fetchUsers, updateProfile } = require("./controllers");

// Create a mini express application
const router = express.Router();

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.get("/dashboard", fetchUsers);

router.put(
  "/user",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);

module.exports = router;
