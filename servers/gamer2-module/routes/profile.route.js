const express = require("express");
const router = express.Router();
const { getProfile, updateProfile,getProfilePic } = require("../controllers/profileController");
const { verifyToken} = require("../middleware/auth.js")
const { imageMiddleware } = require("../middleware/imageMiddleware");


router.get("/",verifyToken,getProfile)
router.put("/update",verifyToken,imageMiddleware,updateProfile);
router.get('/img/:id',getProfilePic)

module.exports = router;