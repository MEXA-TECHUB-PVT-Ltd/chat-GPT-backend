const faqsModel = require("../models/faqsModel");
const mongoose = require("mongoose");

// Get All faqs 
exports.getAllfaqss = (req, res) => {
    faqsModel.find({}, (error, result) => {
        if (error) {
            res.send({ result: error, error: true, message: "Some Error ", statusCode: 200 })
        } else {
            res.send({ result: result, error: false, message: "Successfully Get all ", statusCode: 200 })
        }
    }).sort({ $natural: -1 }).populate('added_by')
}
// // Get faqs 
exports.getSpecificfaqs = (req, res) => {

    const faqsId = req.params.faqsId;
    faqsModel.find({ _id: faqsId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('added_by')
}

// Delete 
exports.deletefaqs = (req, res) => {
    const faqsId = req.params.faqsId;
    faqsModel.findByIdAndDelete(faqsId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deletefaqsAll = (req, res) => {
    faqsModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createfaqs = async (req, res) => {
    const faqs = new faqsModel({
        _id: mongoose.Types.ObjectId(),
        added_by: req.body.added_by,
        question: req.body.question,
        answer: req.body.answer,

    });
    faqs.save((error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error Creating faqs", statusCode: 200 })
        } else {
            res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            // res.sendStatus(200)
        }
    })
}
// Update 
exports.updatefaqs = async (req, res) => {
    const updateData = {
        added_by: req.body.added_by,
        question: req.body.question,
        answer: req.body.answer,
    }
    const options = {
        new: true
    }
    faqsModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




