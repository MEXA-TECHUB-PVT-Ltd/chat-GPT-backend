const mongoose = require("mongoose");
const subscription_userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subscriptionPlan:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subscription_plan'  
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'  
    },
    started_at:String,
    ended_at:String,
    valid:Boolean
}
);
module.exports = mongoose.model("subscription_user", subscription_userSchema);