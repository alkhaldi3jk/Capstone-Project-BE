const express = require("express");
const passport = require("passport");
const {fetchList,createList} = require("./controllers")

const router = express.Router();


router.get("/dashboard", fetchList);

router.post("/dashboard", createList)


module.exports = router;