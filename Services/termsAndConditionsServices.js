const TermsAndConditionModel = require("../models/TermsAndConditionModel");
const mongoose = require("mongoose");

// Get All TermsAndCondition 
exports.getAllTermsAndConditions = (req, res) => {
    TermsAndConditionModel.find({}, (error, result) => {
        if (error) {
            res.send({ result: error, error: true, message: "Some Error ", statusCode: 200 })
        } else {
            res.send({ result: result[0], error: false, message: "Successfully Get all ", statusCode: 200 })
        }
    }).sort({ $natural: -1 })
}
// // Get TermsAndCondition 
exports.getSpecificTermsAndCondition = (req, res) => {

    const TermsAndConditionId = req.params.TermsAndConditionId;
    TermsAndConditionModel.find({ _id: TermsAndConditionId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}

// Delete 
exports.deleteTermsAndCondition = (req, res) => {
    const TermsAndConditionId = req.params.TermsAndConditionId;
    TermsAndConditionModel.findByIdAndDelete(TermsAndConditionId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deleteTermsAndConditionAll = (req, res) => {
    TermsAndConditionModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createTermsAndCondition = async (req, res) => {
    const TermsAndCondition = new TermsAndConditionModel({
        _id: mongoose.Types.ObjectId(),
        TermsAndCondition: req.body.TermsAndCondition,
       

    });
    TermsAndCondition.save((error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error Creating TermsAndCondition", statusCode: 200 })
        } else {
            res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            // res.sendStatus(200)
        }
    })
}
// Update 
exports.updateTermsAndCondition = async (req, res) => {
    const updateData = {
        TermsAndCondition: req.body.TermsAndCondition,
    }
    const options = {
        new: true
    }
    TermsAndConditionModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




