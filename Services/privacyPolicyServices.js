const privacyPolicyModel = require("../models/privacyPolicyModel");
const mongoose = require("mongoose");

// Get All privacyPolicy 
exports.getAllprivacyPolicys = (req, res) => {
    privacyPolicyModel.find({}, (error, result) => {
        if (error) {
            res.send({ result: error, error: true, message: "Some Error ", statusCode: 200 })
        } else {
            res.send({ result: result[0], error: false, message: "Successfully Get all ", statusCode: 200 })
        }
    }).sort({ $natural: -1 })
}
// // Get privacyPolicy 
exports.getSpecificprivacyPolicy = (req, res) => {

    const privacyPolicyId = req.params.privacyPolicyId;
    privacyPolicyModel.find({ _id: privacyPolicyId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}

// Delete 
exports.deleteprivacyPolicy = (req, res) => {
    const privacyPolicyId = req.params.privacyPolicyId;
    privacyPolicyModel.findByIdAndDelete(privacyPolicyId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deleteprivacyPolicyAll = (req, res) => {
    privacyPolicyModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createprivacyPolicy = async (req, res) => {
    const privacyPolicy = new privacyPolicyModel({
        _id: mongoose.Types.ObjectId(),
        PrivacyPolicy: req.body.PrivacyPolicy,
       

    });
    privacyPolicy.save((error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error Creating privacyPolicy", statusCode: 200 })
        } else {
            res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            // res.sendStatus(200)
        }
    })
}
// Update 
exports.updateprivacyPolicy = async (req, res) => {
    const updateData = {
        PrivacyPolicy: req.body.PrivacyPolicy,
    }
    const options = {
        new: true
    }
    privacyPolicyModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




