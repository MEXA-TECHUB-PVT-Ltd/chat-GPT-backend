const mongoose = require("mongoose");
const subscription_planSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    features: String,
    price:String
}
);
module.exports = mongoose.model("subscription_plan", subscription_planSchema);