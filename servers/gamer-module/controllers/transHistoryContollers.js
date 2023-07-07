const transaction = require("../models/transHistoryModel");
const mongoose = require('mongoose');
//console.log(transaction);
exports.additem = async (req, res) => {
  try {
    const {user_id} = req.query
    const { orderStatus } = req.body;
    console.log(orderStatus);
    console.log(user_id);
    
    const createTransaction = await transaction.create( {orderStatus,user_id} );
  
    res.status(200).send({ msg: "Transaction stored successfully" });

  } catch (error) {
    console.log(error);
  }
};

//const { Types } = require('mongoose');

exports.displayitem = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const pagenum = req.query.pagenum;
    const size = req.query.size;

    console.log("tuid: ", user_id);

    const skip = size * (pagenum - 1);
    const limit = parseInt(size); // Parse size to integer

    const count = await transaction.countDocuments({ user_id });
    const totalTrans = await transaction.find();
   
    console.log(count);

    const transactions = await transaction.find({ user_id }).skip(skip).limit(limit);

    //console.log("transactions are:");
    //console.log(transactions);

    res.status(200).send({
      transactions,
      status: true,
      msg: "Products displayed successfully",
      total_counts: count,
      total_trans:totalTrans,
    });
  } catch (error) {
    res.status(500).json({ error: `Internal server error ${error}` });
  }
};
