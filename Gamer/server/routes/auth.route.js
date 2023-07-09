const express = require("express");
const router = express.Router();
const { signup, login ,verifyOtp, sendVerificationEmail,addProfilepic} = require("../controllers/authControllers.js");
const {RegisterValidations,AuthenticateValidations} = require("../services/validation.js")
const { validationMiddleware } = require("../middleware/validator.js")


router.post("/register",RegisterValidations,validationMiddleware,signup);
router.post("/login",AuthenticateValidations,validationMiddleware,login);
router.post("/verifyotp",verifyOtp);
router.post("/getotp",sendVerificationEmail)
//router.put('/update',verifyToken,imageMiddleware,addProfilepic)
// router.post("/resendotp",resendOtp);

module.exports = router;
