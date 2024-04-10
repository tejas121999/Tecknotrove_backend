const express = require("express");
const router = express.Router();
const controllers = require("../controller/Users");
const verify = require("../middleware/JWT");

router.post("/create-user", controllers.registerUser);
router.post("/auth", controllers.loginUser);
router.post("/get-details", verify.validateToken, controllers.getDetails);

module.exports = router;
