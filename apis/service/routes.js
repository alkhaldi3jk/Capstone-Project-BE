const express = require("express");
const passport = require("passport");
const upload = require("../../middlewares/multer");
const { fetchList, createList } = require("./controllers");

const router = express.Router();

router.get("/", fetchList);

router.post(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createList
);

module.exports = router;
