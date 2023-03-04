const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer')
// Get All user 
exports.getAllusers = (req, res) => {
    userModel.find({}, (error, result) => {
        if (error) {
            res.send({ result: error, error: true, message: "Some Error ", statusCode: 200 })
        } else {
            res.send({ result: result, error: false, message: "Get all Users ", statusCode: 200 })
        }
    }).sort({ $natural: -1 })
}
// // Get subscriptionPlan 
exports.getUserById = (req, res) => {

    const userId = req.params.userId;
    userModel.find({ _id: userId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
// Delete All
exports.deleteuserAll = (req, res) => {
    userModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// // Login 
exports.loginuser = (req, res) => {
    const findUser = {
        email: req.body.email
    }
    userModel.findOne(findUser, (error, result) => {
        if (error) {
            res.json(error)
        } else {
            if (result) {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    const updateData = {
                        isLogin: true
                    }
                    const options = {
                        new: true
                    }
                    userModel.findByIdAndUpdate(result._id, updateData, options, (error, result) => {
                        if (error) {
                            res.status(200).json({ data: result, error: true, message: error.message })

                        } else {
                            res.status(200).json({ data: result, error: false, message: "Login Successfully" })
                        }
                    })

                } else {
                    res.json({ message: "Invalid Password", data: result, error: true })
                }
            } else {
                res.json({ message: "Email Not Found", data: result, error: true })
            }
        }
    })
}
// // Verify User Profile 
exports.verifyProfile = (req, res) => {
    const findUser = {
        email: req.body.email
    }
    userModel.findOne(findUser, (error, result) => {
        if (error) {
            res.json(error)
        } else {
            if (result) {
                const updateData = {
                    verified_status: req.body.verified_status
                }
                const options = {
                    new: true
                }
                userModel.findByIdAndUpdate(result._id, updateData, options, (error, result) => {
                    if (error) {
                        res.status(200).json({ data: result, error: true, message: error.message })

                    } else {
                        res.status(200).json({ data: result, error: false, message: "Login Successfully" })
                    }
                })


            } else {
                res.json({ message: "Email Not Found", data: result, error: true })
            }
        }
    })
}
// Update 
exports.logoutuser = async (req, res) => {
    const updateData = {
        isLogin: false
    }
    const options = {
        new: true
    }
    userModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json({ data: result, message: error.message, error: true })
        } else {
            res.send({ data: result, message: "Logout Successfully", error: false })
        }
    })
}
// Forget Password Otp 
exports.forgetPassworduser = async (req, res) => {
    let data = await userModel.findOne({
        email: req.body.email
    });
    const responseType = {};
    responseType.data = data
    console.log(data)
    if (data) {
        let otpcode = Math.floor(1000 + Math.random() * 9000);
        console.log(otpcode)
      
        responseType.statusText = 'Success'
        mailer(req.body.email, otpcode)
        console.log(otpcode)
        responseType.message = 'Please check Your Email Id';
        responseType.otp = otpcode;
    } else {
        responseType.statusText = 'error'
        responseType.message = 'Email Id not Exist';
    }
    res.status(200).json(responseType)
}
// OTP TWILIO 
const mailer = (email, otp) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'rimshanimo22@gmail.com',
            pass: 'oespmdfxhmbhrxgd'
        }
    });
    transporter.verify().then(console.log).catch(console.error);

    // send mail with defined transport object
    var mailOptions = {
        from: 'rimshanimo22@gmail.com',
        to: email,
        subject: `OTP code is ` + otp,
        text: `Email Verification :OTP code is ` + otp,

    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent ' + info.response)
        }
    });
}
// Delete 
exports.deleteuser = (req, res) => {
    const userId = req.params.userId;
    userModel.findByIdAndDelete(userId, (error, result) => {
        if (error) {
            res.send({ status: false, message: error.message, error: true })
        } else {
            res.json({ status: true, message: "Deleted Successfully", error: false })
        }
    })
}
// Create 
exports.createuser = async (req, res) => {
    userModel.find({ email: req.body.email }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const hashedPassword = bcrypt.hashSync(req.body.password, 12)

                const user = new userModel({
                    _id: mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hashedPassword,
                    isLogin: false,
                    verified_status: false,
                    subscriptionPlan:req.body.subscriptionPlan

                });
                user.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({ data: result, message: "Created Successfully", error: false })
                    }
                })

            } else {
                res.json({ data: result, message: "Email Already Exists", error: true })

            }
        }
    })

}
// Update 
exports.updateuser = async (req, res) => {
    const findUser = {
        email: req.body.email
    }
    userModel.findOne(findUser, (error, result) => {
        if (error) {
            res.json(error)
        } else {
            if (result) {
                // res.json({ message: "Email  Found", data: result, error: false })
                const hashedPassword = bcrypt.hashSync(req.body.password, 12)
                const updateData = {
                    email: req.body.email,
                    password: hashedPassword
                }
                const options = {
                    new: true
                }
                userModel.findByIdAndUpdate(result._id, updateData, options, (error, result) => {
                    if (error) {
                        res.json({ status: false, message: error.message })
                    } else {
                        res.send({ data: result, status: true, message: "Updated Password Successfully" })
                    }
                })
                // if (bcrypt.compareSync(req.body.password, result.password)) {
                //     const updateData = {
                //         isLogin: true
                //     }
                //     const options = {
                //         new: true
                //     }
                //     userModel.findByIdAndUpdate(result._id, updateData, options, (error, result) => {
                //         if (error) {
                //             res.status(200).json({ data: result, error: true, message: error.message })

                //         } else {
                //             res.status(200).json({ data: result, error: false, message: "Login Successfully" })
                //         }
                //     })

                // } else {
                //     res.json({ message: "Invalid Password", data: result, error: true })
                // }
            } else {
                res.json({ message: "Email Not Found", data: result, error: true })
            }
        }
    })

    // const updateData = {
    //     email: req.body.email,
    //     password: hashedPassword
    // }
    // const options = {
    //     new: true
    // }
    // userModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
    //     if (error) {
    //         res.json({ status: false, message: error.message })
    //     } else {
    //         res.send({ data: result, status: true, message: "Updated Password Successfully" })
    //     }
    // })
}
// Update profile 
// Update 
exports.updateProfile = async (req, res) => {
    const updateData = {
        verified_status: req.body.verified_status,
        subscriptionPlan:req.body.subscriptionPlan
    }
    const options = {
        new: true
    }
    userModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}



