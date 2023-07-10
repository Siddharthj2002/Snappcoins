const wallet = require("../models/walletModel");
const User = require("../models/gamerModel");
exports.wallet = async (req, res) => {
    try {
      const {gamerId,num_of_tokens} = req.body;

      const {userId} = await User.findById(req.query.uid)
  
      const createwallet =await wallet.create({userId,gamerId,num_of_tokens})
  
      res.status(200).send({msg:"wallet creation Successful"})
  
      }
      catch (error) {
        console.log(error);
      }
  }

  exports.getCoins = async (req, res) => {
    try {
      const user = await User.findById(req.query.id).select("gamerId");
      res.status(200).json({ msg: "snap coins displayed successfully..",num_of_tokens });
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  }