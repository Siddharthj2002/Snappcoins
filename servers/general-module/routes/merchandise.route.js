const express = require("express");
const { getMerchandises, getImage } = require("../controllers/merchandiseController.js");
const router = express.Router();

router.get('/getall',getMerchandises)
router.get('/img:id',getImage)

module.exports = router;