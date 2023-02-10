const companyModel = require("../models/company");
const mongoose = require("mongoose");

// Get All company 
exports.getAllcompanys = (req, res) => {
    companyModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get company 
exports.getSpecificcompany = (req, res) => {

    const companyId = req.params.companyId;
    companyModel.find({ _id: companyId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult,error:false, message: "Get Data Successfully" ,statusCode:200})

        } catch (err) {
            res.status(200).json({ result: err,error:true, message: "Not getting Data" ,statusCode:200})
        }
    })
}

// Delete 
exports.deletecompany = (req, res) => {
    const companyId = req.params.companyId;
    companyModel.findByIdAndDelete(companyId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result,error:true, message: error.message ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "Deleted Successfully" ,statusCode:200})

        }
    })
}
// Delete All
exports.deleteCompanyAll = (req, res) => {
    companyModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Create 
exports.createcompany = async (req, res) => {
    companyModel.find({ name: req.body.name }, (error, result) => {
        if (error) {
            res.status(200).json({ result: error,error:true, message: "Error in company name " ,statusCode:200})

        } else {
            if (result === undefined || result.length == 0) {
                const company = new companyModel({
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    address: req.body.address,
                    zip_code: req.body.zip_code,
                    phone: req.body.phone,
                    fax: req.body.fax,

                });
                company.save((error, result) => {
                    if (error) {
                        res.status(200).json({ result: error,error:true, message: "Error Creating Company" ,statusCode:200})
                    } else {
                        res.status(200).json({ result: result,error:false, message: "Created Successfully" ,statusCode:200})
                        // res.sendStatus(200)
                    }
                })

            } else {
                res.status(200).json({ result: result,error:true, message: "Company Already Exists" ,statusCode:200})

            }
        }
    })

}
// Update 
exports.updatecompany = async (req, res) => {
    const updateData = {
        name: req.body.name,
        address: req.body.address,
        zip_code: req.body.zip_code,
        phone: req.body.phone,
        fax: req.body.fax,
    }
    const options = {
        new: true
    }
    companyModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result,error:false, message:error.message  ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "Updated Successfully" ,statusCode:200})

        }
    })
}




