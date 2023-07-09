const express = require("express");
const router = express.Router();
const {wallet,getCoins} = require("../controllers/walletControllers.js");
const {RegisterValidations,AuthenticateValidations} = require("../services/validation.js")
const { validationMiddleware } = require("../middleware/validator.js")

router.post("/creation",wallet);
router.get("/coins",getCoins);
module.exports = router;