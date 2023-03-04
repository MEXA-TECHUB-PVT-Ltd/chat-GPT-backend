const subscriptionPlanModel = require("../models/subscriptionPlanModel");
const mongoose = require("mongoose");

// Get All subscriptionPlan 
exports.getAllsubscriptionPlans = (req, res) => {
    subscriptionPlanModel.find({}, (error, result) => {
        if (error) {
            res.send({ result: error, error: true, message: "Some Error ", statusCode: 200 })
        } else {
            res.send({ result: result, error: false, message: "Successfully get all ", statusCode: 200 })
        }
    }).sort({ $natural: -1 })
}
// // Get subscriptionPlan 
exports.getSpecificsubscriptionPlan = (req, res) => {

    const subscriptionPlanId = req.params.subscriptionPlanId;
    subscriptionPlanModel.find({ _id: subscriptionPlanId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}

// Delete 
exports.deletesubscriptionPlan = (req, res) => {
    const subscriptionPlanId = req.params.subscriptionPlanId;
    subscriptionPlanModel.findByIdAndDelete(subscriptionPlanId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deletesubscriptionPlanAll = (req, res) => {
    subscriptionPlanModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createsubscriptionPlan = async (req, res) => {
    subscriptionPlanModel.find({ title: req.body.title }, (error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error in subscriptionPlan name ", statusCode: 200 })

        } else {
            if (result === undefined || result.length == 0) {
                let Array = req.body.features
                let nameArr = Array.split(',');
                // console.log(nameArr)
                const subscriptionPlan = new subscriptionPlanModel({
                    _id: mongoose.Types.ObjectId(),
                    title: req.body.title,
                    features: nameArr,
                    price: req.body.price,
                    num_of_searches: req.body.num_of_searches,
                    validity: req.body.validity

                });
                subscriptionPlan.save((error, result) => {
                    if (error) {
                        res.status(200).json({ result: error, error: true, message: "Error Creating subscriptionPlan", statusCode: 200 })
                    } else {
                        res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
                        // res.sendStatus(200)
                    }
                })

            } else {
                res.status(200).json({ result: result, error: true, message: "subscriptionPlan Already Exists", statusCode: 200 })

            }
        }
    })

}
// Update 
exports.updatesubscriptionPlan = async (req, res) => {
    if (req.body.features === '' || req.body.features === null || req.body.features === undefined) {
        const updateData = {
            title: req.body.title,
            price: req.body.price,
            num_of_searches: req.body.num_of_searches,
            validity: req.body.validity
        }
        const options = {
            new: true
        }
        subscriptionPlanModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
            if (error) {
                res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

            } else {
                res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

            }
        })
    } else {
        let Array = req.body.features
        let nameArr = Array.split(',');
        const updateData = {
            title: req.body.title,
            features: nameArr,
            price: req.body.price,
            num_of_searches: req.body.num_of_searches,
            validity: req.body.validity
        }
        const options = {
            new: true
        }
        subscriptionPlanModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
            if (error) {
                res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

            } else {
                res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

            }
        })
    }

}




