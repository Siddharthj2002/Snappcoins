const gamingMerchant = require("../models/gamingMerchantModel");
const User = require("../models/gamingMerchantModel");
const Merchandise = require("../models/Merchandise")
const merchantTransaction = require("../models/merchantTransactions")

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

exports.getTransactions = async(req,res) =>{
    try{
        const {id} = req.query
        const { size, pagenum ,tid} = req.query
        var query = {}
        query.skip = size * (pagenum - 1)
        query.limit = size
        let transactions,count;
        if(tid){
            transactions = [await merchantTransaction.findById({_id:tid})]
            count=1;
        }
        else{
            transactions = await merchantTransaction.find({userid:id} , {} , query)
            count = await merchantTransaction.count({userid:id}).then((data) => {
                return data
            })
        }
        res.status(200).json({transactions, status:true, msg:"Transactions found succesfully", count : count});
    }catch(err){
        console.error(err);
        return res.status(500).json({ status: false, msg: "Transaction Failure" });
    }
}