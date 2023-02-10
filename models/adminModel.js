const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    password: String,
    img: String,
    privacy_policy:String,
    terms_and_conditions:String,
    isLogin:Boolean
}
);
module.exports = mongoose.model("admin", adminSchema);