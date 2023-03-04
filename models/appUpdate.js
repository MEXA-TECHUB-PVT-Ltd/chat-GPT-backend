const mongoose = require("mongoose");
const app_updateSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    added_by:String,
    profile_image:String,
    name:String,
    creation_date:String,
    notes: Array,
    
}
);
module.exports = mongoose.model("app_update", app_updateSchema);