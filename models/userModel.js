const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    isLogin:Boolean
}
);
module.exports = mongoose.model("user", userSchema);