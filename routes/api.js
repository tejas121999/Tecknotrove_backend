const express = require("express");
const router = express.Router();
const user = require("./User");

router.use("/user", user);

module.exports = router;
