const {Schema, model} =   require("mongoose");
const bcrypt = require("bcrypt");

const gamerSchema = new Schema({
   userName:{
      type: String,
      
   },
   password: {
      type: String,
      
   },
    email: {
        type: String,   
        unique:true
        
    },
    walletMoney: {
      type: Number,
      default: 0

    },
    joiningTime: {
      type: Date,
      default: Date.now

    },
    verified:{
        type:Boolean,
        default:false

    },
    image:{
      type:String,
      
    }
    ,
    walletMoney: {
      type: Number,
      default: 1000
    },
    redeemed: {
      type: Number,
      default: 0
    },

   },
   {timestamp:true}
   )

   gamerSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified("password")) return next();
    user.password = bcrypt.hash(user.password,10);
    next();
   })
  
   //now create a collection inside the database

   const gamer = new model("gamer",gamerSchema);
   
   module.exports=gamer;