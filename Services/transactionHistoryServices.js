const TransactionModel = require("../models/TransactionModel");
const mongoose = require("mongoose");

// Get All Transaction 
exports.getAllTransactions = (req, res) => {
    TransactionModel.find({}, (error, result) => {
        if (error) {
            res.send({ result: error, error: true, message: "Some Error ", statusCode: 200 })
        } else {
            res.send({ result: result[0], error: false, message: "Successfully Get all ", statusCode: 200 })
        }
    }).sort({ $natural: -1 })
}
// // Get Transaction 
exports.getSpecificTransaction = (req, res) => {

    const TransactionId = req.params.TransactionId;
    TransactionModel.find({ _id: TransactionId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
exports.getSpecificTransactionbyUserId = (req, res) => {

    const user_Id = req.body.user_Id;
    TransactionModel.find({ user_Id: user_Id }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}

// Delete 
exports.deleteTransaction = (req, res) => {
    const TransactionId = req.params.TransactionId;
    TransactionModel.findByIdAndDelete(TransactionId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deleteTransactionAll = (req, res) => {
    TransactionModel.deleteMany({}, (error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createTransaction = async (req, res) => {
    const Transaction = new TransactionModel({
        _id: mongoose.Types.ObjectId(),
        user_Id: req.body.user_Id,
        userName:req.body.userName,
        paymentIntent_Secret:req.body.paymentIntent_Secret,
        customer_Stripe_Id:req.body.customer_Stripe_Id,
        ephemeralKey:req.body.ephemeralKey,
        amount:req.body.amount,
        user_email:req.body.user_email,
        client_secret:req.body.client_secret,
        paymentStatus:req.body.paymentStatus
       

    });
    Transaction.save((error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error Creating Transaction", statusCode: 200 })
        } else {
            res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            // res.sendStatus(200)
        }
    })
}
// Update 
exports.updateTransaction = async (req, res) => {
    const updateData = {
        user_Id: req.body.user_Id,
        userName:req.body.userName,
        user_email:req.body.user_email,
        paymentIntent_Secret:req.body.paymentIntent_Secret,
        customer_Stripe_Id:req.body.customer_Stripe_Id,
        ephemeralKey:req.body.ephemeralKey,
        amount:req.body.amount,
        client_secret:req.body.client_secret,
        paymentStatus:req.body.paymentStatus

    }
    const options = {
        new: true
    }
    TransactionModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




