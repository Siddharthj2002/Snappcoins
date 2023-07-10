const express = require("express");
const router = express.Router();
const {additem,displayitem,gamerCheckout} = require("../controllers/transHistoryContollers");


router.post("/addItem",additem);
router.get("/displayItems",displayitem);
router.post('/gamerCheckout',gamerCheckout)
module.exports = router;