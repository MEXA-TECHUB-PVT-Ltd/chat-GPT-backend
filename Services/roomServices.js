const roomModel = require("../models/roomModel");
const mongoose = require("mongoose");

// Get All room 
exports.getAllrooms = (req, res) => {
    roomModel.find({}, (error, result) => {
        if (error) {
            res.send({ result: error, error: true, message: "Error", statusCode: 200 })
        } else {
            res.send({ result: result, error: false, message: "Get Data Successfully", statusCode: 200 })
        }
    }).sort({ $natural: -1 }).populate('user_id').populate('messages')
}
// // Get room 
exports.getSpecificroom = (req, res) => {

    const roomId = req.params.roomId;
    roomModel.find({ _id: roomId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('user_id').populate('messages')
}
// Get by User Id 
exports.getroomByUserId = (req, res) => {

    const user_id = req.body.user_id;
    roomModel.find({ user_id: user_id }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('user_id').populate('messages')
}
// Delete 
exports.deleteroom = (req, res) => {
    const roomId = req.params.roomId;
    roomModel.findByIdAndDelete(roomId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deleteroomAll = (req, res) => {
    roomModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Delete All
exports.deleteroomAllByUserId = (req, res) => {
    const user_id = req.body.user_id;
    roomModel.find({ user_id: user_id }, function (err, foundResult) {
        try {
            let Array = foundResult.map(s => s._id)
            console.log(Array)
            roomModel.deleteMany({
                _id: {
                    $in: Array
                }
            }, (error, result) => {
                if (error) {
                    res.send(error)
                    res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

                } else {
                    res.status(200).json({ result: result, error: false, message: "All Rooms for this user Deleted Successful ", statusCode: 200 })

                }
            })
        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })

}
// Create 
exports.createroom = async (req, res) => {
    roomModel.find({ user_id: req.body.user_id, title_room: req.body.title_room }, (error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error in room name ", statusCode: 200 })

        } else {
            if (result === undefined || result.length == 0) {
                const room = new roomModel({
                    _id: mongoose.Types.ObjectId(),
                    title_room: req.body.title_room,
                    user_id: req.body.user_id,
                    messages: [],

                });
                room.save((error, result) => {
                    if (error) {
                        res.status(200).json({ result: error, error: true, message: "Error Creating room", statusCode: 200 })
                    } else {
                        res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
                        // res.sendStatus(200)
                    }
                })

            } else {
                res.status(200).json({ result: result, error: true, message: "room Already Exists", statusCode: 200 })

            }
        }
    })

}
// Update 
exports.updateroom = async (req, res) => {
    const updateData = {
        title_room: req.body.title_room,
    }
    const options = {
        new: true
    }
    roomModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




