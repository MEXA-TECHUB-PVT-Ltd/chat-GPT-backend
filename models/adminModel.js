const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    password: String,
    img: String,
    isLogin:Boolean
}
);
module.exports = mongoose.model("admin", adminSchema);