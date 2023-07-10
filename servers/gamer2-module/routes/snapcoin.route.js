const express = require("express");
const router = express.Router();

const {snapcoinbank} = require('../controllers/snapcoinController');

router.post('/update-bank',snapcoinbank);

module.exports = router;