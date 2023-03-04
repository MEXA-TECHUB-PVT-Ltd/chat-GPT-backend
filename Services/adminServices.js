const adminModel = require("../models/adminModel");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
// const forgetPasswordModel = require("../models/forgetPasswordModel");
var nodemailer = require('nodemailer')
// Get All Admin 
exports.getAlladmins = (req, res) => {
    adminModel.find({}, (error, result) => {
        if (error) {
            res.send({ result: error,error:true, message: "Error" ,statusCode:200})
        } else {
            res.send({ result: result,error:false, message: "Get Data Successfully" ,statusCode:200})
        }
    }).sort({ $natural: -1 })
}
// Get Admin 
exports.getSpecificadmin = (req, res) => {
    const adminId = req.params.adminId;
    adminModel.find({ _id: adminId }, function (err, foundResult) {
        try {
            res.json({data:foundResult})
        } catch (err) {
            res.json(err)
        }
    })
}
// Login 
exports.loginAdmin = (req, res) => {
    const findUser = {
        email: req.body.email
    }
    adminModel.findOne(findUser, (error, result) => {
        if (error) {
            res.json(error)
        } else {
            if (result) {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    const updateData = {
                        isLogin:true
                    }
                    const options = {
                        new: true
                    }
                    adminModel.findByIdAndUpdate(result._id, updateData, options, (error, result) => {
                        if (error) {
                            res.json(error.message)
                        } else {
                            res.json({data:result,message:"Login Successfully"})
                        }
                    })

                } else {
                    res.json({message:"Invalid Password"})
                }
            } else {
                res.json({message:"Email Not Found"})
            }
        }
    })
}
// Update 
exports.logoutAdmin = async (req, res) => {
    const updateData = {
        isLogin:false
    }
    const options = {
        new: true
    }
    adminModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Logout Successfully"})
        }
    })
}
// Forget Password Otp 
// Forget Password Otp 
exports.forgetPasswordAdmin = async (req, res) => {
    let data = await adminModel.findOne({
        email: req.body.email
    });
    const responseType = {};
    responseType.data = data
    console.log(data)
    if (data) {
        let otpcode = Math.floor(1000 + Math.random() * 9000);
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
// exports.forgetPasswordAdmin = async (req, res) => {
//     mailer(req.body.email, 090)

//     let data = await adminModel.findOne({
//         email: req.body.email
//     });
//     const responseType = {};
//     responseType.data = data
//     console.log(data)
//     if (data) {
//         let otpcode = Math.floor((Math.random() * 10000) + 1);
//         // let otpData = new forgetPasswordModel({
//         //     _id: mongoose.Types.ObjectId(),
//         //     email: req.body.email,
//         //     code: otpcode,
//         //     expiresIn: new Date().getTime() + 300 * 1000
//         // })
//         // let otpResponse = await otpData.save();
//         responseType.statusText = 'Success'
//         mailer(req.body.email, 090)
//         console.log(otpcode)
//         responseType.message = 'Please check Your Email Id';
//         responseType.otp = otpcode;
//     } else {
//         responseType.statusText = 'error'
//         responseType.message = 'Email Id not Exist';
//     }
//     res.status(200).json(responseType)
// }
// // OTP TWILIO 
// const mailer = (email, otp) => {
//     var transporter = nodemailer.createTransport({
//         service: 'mail.levelhai.com:5000',
//         port: 25,
//         secure: false,
//         auth: {
//             user: 'mtechub/mtechub-mailing-srver',
//             pass: 'z2o1ZuEjEBhoqR7tM0qwfx1p'
//         }
//     });
//     transporter.verify().then(console.log).catch(console.error);

//     // send mail with defined transport object
//     var mailOptions = {
//         from: 'no-reply@levelhai.com',
//         to: email,
//         subject: `OTP code is ` + otp,
//         text: `Email Verification :OTP code is ` + otp,

//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             // console.log('Email sent ' + info.response)
//         }
//     });
// }
// Delete 
exports.deleteadmin = (req, res) => {
    const adminId = req.params.adminId;
    adminModel.findByIdAndDelete(adminId, (error, result) => {
        if (error) {
            res.send({message:error.message,status:false})
        } else {
            res.json({ message: "Deleted Successfully" ,status:true})
        }
    })
}
// Create 
exports.createadmin = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)
    adminModel.find({ email: req.body.email }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const admin = new adminModel({
                    _id: mongoose.Types.ObjectId(),
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    img: req.body.img,
                    isLogin:false
                });
                admin.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({data:result,message:"Created Successfully"})
                    }
                })

            } else {
                res.json({data:result,message:"Email Already Exist"})

            }
        }
    })

}
// Update 
exports.updateadmin = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)
    const updateData = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        img: req.body.img,
    }
    const options = {
        new: true
    }
    adminModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json({message:error.message,status:false})
        } else {
            res.send({data:result,status:true,message:"Updated Successfully"})
        }
    })
}
//Update Profile
exports.updateadminProfile = async (req, res) => {
    const updateData = {
        username: req.body.username,
        email: req.body.email,
        img: req.body.img,
        privacy_policy: req.body.privacy_policy,
        terms_and_conditions: req.body.terms_and_conditions,
    }
    const options = {
        new: true
    }
    adminModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json({message:error.message,status:false})
        } else {
            res.send({data:result,status:true,message:"Updated Successfully"})
        }
    })
}




