const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    address:String,
    zip_code:String,
    phone:String,
    fax:String
}
);
module.exports = mongoose.model("company", companySchema);