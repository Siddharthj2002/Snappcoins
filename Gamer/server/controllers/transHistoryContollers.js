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

    
    //const totalTrans = await transaction.find();

    let query = { user_id };

    if (searchTerm) {
      const trimmedSearchTerm = searchTerm.trim();
      console.log("trimmedSearchTerm: ", trimmedSearchTerm);
      query.orderStatus = { $regex: trimmedSearchTerm, $options: 'i' };

    }

    const transactions = await transaction.find(query)
      .skip(skip)
      .limit(limit);
    
    
    let count

    if(searchTerm){

      count = await transaction.countDocuments(query)
    }
    else{
       count = await transaction.countDocuments({ user_id });
    }

    console.log(count)

    res.status(200).send({
      transactions,
      status: true,
      msg: "Products displayed successfully",
      total_counts: count,
      

    });
  } catch (error) {
    res.status(500).json({ error: `Internal server error ${error}` });
  }
};



