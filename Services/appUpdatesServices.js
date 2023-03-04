const appUpdate = require("../models/appUpdate");
const mongoose = require("mongoose");

// Get All appUpdate 
exports.getAllappUpdates = (req, res) => {
    appUpdate.find({}, (error, result) => {
        if (error) {
            res.send({ result: error, error: true, message: "Some Error ", statusCode: 200 })
        } else {
            res.send({ result: result, error: false, message: "Successfully Get all ", statusCode: 200 })
        }
    }).sort({ $natural: -1 })
}
// // Get appUpdate 
exports.getSpecificappUpdate = (req, res) => {

    const appUpdateId = req.params.appUpdateId;
    appUpdate.find({ _id: appUpdateId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}

// Delete 
exports.deleteappUpdate = (req, res) => {
    const appUpdateId = req.params.appUpdateId;
    appUpdate.findByIdAndDelete(appUpdateId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deleteappUpdateAll = (req, res) => {
    appUpdate.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createappUpdate = async (req, res) => {
    const date=new Date()
    const appUpdateA = new appUpdate({
        _id: mongoose.Types.ObjectId(),
        added_by:req.body.added_by,
        profile_image:req.body.profile_image,
        name:req.body.name,
        creation_date:date.toISOString(),
        notes: req.body.notes,
    });
    appUpdateA.save((error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error Creating appUpdate", statusCode: 200 })
        } else {
            res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            // res.sendStatus(200)
        }
    })
}
// Update 
exports.updateappUpdate = async (req, res) => {
    const updateData = {
        added_by:req.body.added_by,
        profile_image:req.body.profile_image,
        name:req.body.name,
        creation_date:req.body.creation_date,
        notes: req.body.notes,
    }
    const options = {
        new: true
    }
    appUpdate.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




