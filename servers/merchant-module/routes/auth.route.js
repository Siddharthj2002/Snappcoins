const express = require("express");
const router = express.Router();
const { signup, login ,verifyOtp, sendVerificationEmail} = require("../controllers/authControllers.js");
const {RegisterValidations,AuthenticateValidations} = require("../utils/validation.js")
const { validationMiddleware } = require("../middleware/validator.js")

router.post("/register",RegisterValidations,validationMiddleware,signup);
router.post("/login",AuthenticateValidations,validationMiddleware,login);
router.post("/verifyotp",verifyOtp);
router.post("/getotp",sendVerificationEmail)

module.exports = router;
