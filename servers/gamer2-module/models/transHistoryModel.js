const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transHistorySchema = new Schema({

   user_id:{
     
      type:String
   },

   transactionDate:{
    
     type:Date,
     default:Date.now

   },
    
   transactionId:{
     
     type:String,
     default: "ID 20220325"
     
   },
   orderStatus:{

     type:String,
     require:true

   }
    
},{
    timestamp:true
});

const transHistory = new mongoose.model('GamertransactionHistory',transHistorySchema);

module.exports = transHistory;