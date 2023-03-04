const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title_room: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'room_msg'
        }
    ]
}
);
module.exports = mongoose.model("room", roomSchema);