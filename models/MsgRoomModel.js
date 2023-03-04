const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room'
    },
    message:String,
    sent_by:{
        type: String,
        enum: ['user','system']
    },
    status:{
        type: String,
        enum: ['liked','unliked','none']
    },
    id:String
}
);
module.exports = mongoose.model("room_msg", roomSchema);