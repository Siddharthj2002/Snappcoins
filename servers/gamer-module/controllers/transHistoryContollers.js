const transaction = require("../models/transHistoryModel");
const mongoose = require('mongoose');
//console.log(transaction);
exports.additem = async (req, res) => {
  try {
    const {user_id} = req.query
    const { orderStatus } = req.body;
    //console.log(orderStatus);
    //console.log(user_id);

    //generate random transaction id :

    const currentYear = new Date().getFullYear().toString();
    const randomDigits = Math.floor(Math.random() * 9000) + 1000;
    const tId = `#ID ${currentYear}${randomDigits}`;

    console.log(tId);
    
    const createTransaction = await transaction.create( {transactionId:tId,orderStatus,user_id} );
  
    res.status(200).send({ msg: "Transaction stored successfully" });

  } catch (error) {
    console.log(error);
  }
};

//const { Types } = require('mongoose');

 // Update the path to your model file

 exports.displayitem = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const pagenum = req.query.pagenum;
    const size = req.query.size;
    const searchTerm = req.query.searchTerm;

    console.log("user_id:", user_id);
    console.log("searchTerm:", searchTerm);

    const skip = size * (pagenum - 1);
    const limit = parseInt(size);

    let query = { user_id };

    if (searchTerm) {
      const trimmedSearchTerm = searchTerm.trim();
      console.log("trimmedSearchTerm: ", trimmedSearchTerm);
      query.orderStatus = { $regex: trimmedSearchTerm, $options: 'i' };
    }

    const transactions = await transaction.find(query)
      .skip(skip)
      .limit(limit);

    let count;

    if (searchTerm) {
      count = await transaction.countDocuments(query);
    } else {
      count = await transaction.countDocuments({ user_id });
    }

    console.log(count);

    let pendingOrders = 0;

    const orders = await transaction.find({user_id})

    orders.forEach((transaction) => {
      if (transaction.orderStatus === 'In transit') {
        pendingOrders++;
      }
    });

    res.status(200).send({
      transactions,
      status: true,
      msg: "Products displayed successfully",
      total_counts: count,
      pendingOrders: pendingOrders,
    });
  } catch (error) {
    res.status(500).json({ error: `Internal server error ${error}` });
  }
};


exports.gamerCheckout = async(req,res) =>{
  try{
      const {pid,gid,gname} = req.query
      const {snaps , itemsPurchased} = req.body
      const {userid,price,title,count,image} = await Merchandise.findById(pid)
      if(snaps >= price){
          const {_id} = await merchantTransaction.create({userid,gamerId:gid,gamerName:gname,productId:pid,product:title,itemsPurchased,snaps,image,status:"pending",transactionEntry:"credit"})
          const {walletMoney} = await User.findById(userid)
          const totalBalance = parseInt(walletMoney) + parseInt(snaps) * parseInt(itemsPurchased)
          const {walletMoney:updatedAmount} =  await User.findByIdAndUpdate({_id:userid},{walletMoney:totalBalance},{ new: true });
          if(updatedAmount == totalBalance){
             const finalCount =  count - parseInt(itemsPurchased)
              await merchantTransaction.findByIdAndUpdate(_id,{status:"success"},{new:true})
              await Merchandise.findByIdAndUpdate({_id:pid},{count:finalCount},{new:true})
              return res.status(200).json({status: true , msg: "Transaction Successful"})
          }
          res.status(200).json({status: true , msg: "Transaction Pending"})
      }
      else{    
          res.status(400).json({status: false , msg: "Insufficient amount"})
      }
  }
  catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Transaction Failure" });
  }
}
