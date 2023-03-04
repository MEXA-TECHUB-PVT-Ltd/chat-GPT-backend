const mongoose = require("mongoose");
const subscription_planSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    num_of_searches:String,
    validity:String,
    features: Array,
    price:String
}
);
module.exports = mongoose.model("subscription_plan", subscription_planSchema);