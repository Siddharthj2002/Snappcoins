const snapcoinbank = require("../models/snapcoinbankModel");


exports.snapcoinbank = async (req, res) => {

    const {
        transaction_id, transaction_status, transaction_date, user_persona, vendor_id, vendor_name, snappcoins_purchased, gamer_id, gamer_name, merchandise_purchased, merchant_id, merchant_name, snappcoins_redeemed,
    } = req.body;

    // Create a new transaction using the SnappcoinBankModel
    const newTransaction = new snapcoinbank({
        transaction_id,
        transaction_status,
        transaction_date,
        user_persona,
        vendor_id,
        vendor_name,
        snappcoins_purchased,
        gamer_id,
        gamer_name,
        merchandise_purchased,
        merchant_id,
        merchant_name,
        snappcoins_redeemed,
    });


    // Save the transaction to the database
    newTransaction
        .save()
        .then((savedTransaction) => {
            // Transaction saved successfully
            //console.log("hello")
            const id = req.query.id;
            
            res.status(201).json(savedTransaction);

        })
        .catch((error) => {
            // Error occurred while saving the transaction
            console.log(error);
            res.status(500).json({ error: "Failed to add transaction" });
        });

};


  