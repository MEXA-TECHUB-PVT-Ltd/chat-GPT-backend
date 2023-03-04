const userSubscriptionModel = require("../models/userSubscriptionModel");
const mongoose = require("mongoose");

// Get All userSubscription 
exports.getAlluserSubscriptions = (req, res) => {
    userSubscriptionModel.find({}, (error, result) => {
        if (error) {
            res.send({ result: error, error: true, message: "Some Error ", statusCode: 200 })
        } else {
            res.send({ result: result, error: false, message: "Successfully get all ", statusCode: 200 })
        }
    }).sort({ $natural: -1 }).populate('subscriptionPlan').populate('userId')
}
// // Get userSubscription 
exports.getSpecificuserSubscription = (req, res) => {

    const userSubscriptionId = req.params.userSubscriptionId;
    userSubscriptionModel.find({ _id: userSubscriptionId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('subscriptionPlan').populate('userId')
}
exports.getTotalSubscriptionsActive = (req, res) => {
    userSubscriptionModel.find({ valid: true }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('subscriptionPlan').populate('userId')
}
// // Get userSubscription by userId
exports.getSpecificuserSubscriptionByUserId = (req, res) => {

    const userId = req.body.userId;
    userSubscriptionModel.find({ userId: userId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('subscriptionPlan').populate('userId')
}
// Delete 
exports.deleteuserSubscription = (req, res) => {
    const userSubscriptionId = req.params.userSubscriptionId;
    userSubscriptionModel.findByIdAndDelete(userSubscriptionId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deleteuserSubscriptionAll = (req, res) => {
    userSubscriptionModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createuserSubscription = async (req, res) => {

    // console.log(nameArr)
    const userSubscription = new userSubscriptionModel({
        _id: mongoose.Types.ObjectId(),
        subscriptionPlan: req.body.subscriptionPlan,
        userId: req.body.userId,
        started_at: req.body.started_at,
        ended_at: req.body.ended_at,
        valid: true

    });
    userSubscription.save((error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error Creating userSubscription", statusCode: 200 })
        } else {
            res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            // res.sendStatus(200)
        }
    })

}
// Update 
exports.updateuserSubscription = async (req, res) => {
        const updateData = {
            started_at: req.body.started_at,
            ended_at: req.body.ended_at,
            valid: req.body.valid
        }
        const options = {
            new: true
        }
        userSubscriptionModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
            if (error) {
                res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

            } else {
                res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

            }
        })
    
}




