const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    isLogin:Boolean,
    verified_status:Boolean,
    subscription_plan:String,
    subscription_status:String,
    customer_Stripe_id:String,
    subscription:[]
    // subscription_plan_id:String,
    // pricing_selected:String,
    // clientSecretSubscription:String,
    // startingdate:String,
    // freeTrialEndDate:String,


    // subscription_plan:{

    // }
}
);
module.exports = mongoose.model("user", userSchema);