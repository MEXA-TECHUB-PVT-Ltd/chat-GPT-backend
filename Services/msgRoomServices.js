const MsgRoomModel = require("../models/MsgRoomModel");
const mongoose = require("mongoose");
const roomModel = require("../models/roomModel");

// Get All MsgRoom 
exports.getAllMsgRooms = (req, res) => {
    MsgRoomModel.find({}, (error, result) => {
        if (error) {
            res.send({ result: error,error:true, message: "Some Error " ,statusCode:200})
        } else {
            res.send({ result: result,error:false, message: "Successfully get all " ,statusCode:200})
        }
    }).sort({ $natural: -1 })
}
// // Get MsgRoom 
exports.ClearChatMsgs = (req, res) => {
    MsgRoomModel.deleteMany({room_id:req.body.room_id}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})
            const updateData = {
                    messages: []
            }
            const options = {
                new: true
            }
            roomModel.findByIdAndUpdate(req.body.room_id, updateData, options, (error, result) => {
                if (error) {
                    res.status(200).json({ result: result,error:false, message:error.message  ,statusCode:200})
        
                } else {
                    // res.status(200).json({ result: result,error:false, message: "Updated Successfully" ,statusCode:200})
        
                }
            })

        }
    })
}


// Delete All
exports.deleteMsgRoomAll = (req, res) => {
    MsgRoomModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Create 
exports.createMsgRoom = async (req, res) => {
   
    MsgRoomModel.find({ room_id: req.body.room_id }, (error, result) => {
        if (error) {
            res.status(200).json({ result: error,error:true, message: "Error in MsgRoom name " ,statusCode:200})

        } else {
            const idCount=result.length
            const count=parseInt(idCount)+parseInt(1)
                const MsgRoom = new MsgRoomModel({
                    _id: mongoose.Types.ObjectId(),
                    room_id: req.body.room_id,
                    message: req.body.message,
                    sent_by: req.body.sent_by,
                    status: req.body.status,
                    id: count,

                });
                MsgRoom.save((error, result) => {
                    if (error) {
                        res.status(200).json({ result: error,error:true, message: "Error Creating MsgRoom" ,statusCode:200})
                    } else {
                        res.status(200).json({ result: result,error:false, message: "Created Successfully" ,statusCode:200})
                        // res.sendStatus(200)
                        const updateData = {
                            $push: {
                                messages: result._id,
                            }
                        }
                        const options = {
                            new: true
                        }
                        roomModel.findByIdAndUpdate(req.body.room_id, updateData, options, (error, result) => {
                            if (error) {
                                res.status(200).json({ result: result,error:false, message:error.message  ,statusCode:200})
                    
                            } else {
                                // res.status(200).json({ result: result,error:false, message: "Updated Successfully" ,statusCode:200})
                    
                            }
                        })
                    }
                })

           
        }
    })

}
// Update 
exports.updateMsgRoom = async (req, res) => {
    const updateData = {
        status: req.body.status,
    }
    const options = {
        new: true
    }
    MsgRoomModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result,error:false, message:error.message  ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "Updated Successfully" ,statusCode:200})

        }
    })
}




