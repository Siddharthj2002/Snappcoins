const User = require("../models/gamingMerchantModel");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/token");
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS
  }
  
});

exports.sendVerificationEmail= async(req,res)=>{
  try{
    const otp = otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
    console.log(otp)
    const {email} = await User.findById(req.query.uid)
    const mailOptions={
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify your email",
      html:`<p>Enter <b>${otp}</b> to verify your email ...</p>`
    }

    const hashedotp = await bcrypt.hash(otp, 10);
    req.app.locals.OTP = hashedotp

//testing

    transporter.sendMail(mailOptions,(err, info) => {
      if(err){
        console.log('err',err);
        console.log(info.messageId);
      }  
    });

    res.status(201).send({ msg: "Otp Sent"});
    
  }catch(err){
    console.log(err);
    res.status(500).json({msg:err});
  }

}

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, dob, password ,email, phoneNumber , address ,role , gender , companyName} = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({success:false, msg: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createuser =await User.create({ firstName,lastName, dob,password: hashedPassword ,email,phoneNumber,address ,role , gender , companyName})

    res.status(200).send({userId:createuser._id, email , msg:"Registration Successful"})

    }
catch (error) {
  if (error.code === 11000 && error.name === 'MongoServerError') {
    // Duplicate key error
    res.status(400).json({ error: 'Phone number already exists' });
  }
  else{
    res.status(500).json({ error: `Internal server error ${error}` });
  }
}
}

exports.login = async (req, res) => {
    try {
        const { password ,email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ status: false, msg: "This email is not registered!!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ status: false, msg: "Password incorrect!!" });
        const token = createAccessToken({ id: user._id });
        res.status(200).json({token,user, id: user._id, email , status: true, msg: "Verify Your Email ..." });
    }
    catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.verifyOtp = async(req,res) =>{
  try{
    const {otp,uid} = req.query;
    const {verified} = await User.findById({_id:uid})
    const result  = await bcrypt.compare(otp,req.app.locals.OTP);
    if (result){
      res.status(201).json({ status: true, msg: "Email Verified" });
      if(!verified) await User.findByIdAndUpdate(uid,{verified : true})
      req.app.locals.OTP=null
    }
    else{
      res.status(400).json({ status: false, msg: "otp mismatched" });
    }
  }
   catch (err) {
     console.error(err);
     return res.status(500).json({ status: false, msg: "Something went wrong !!!" }); }
}
