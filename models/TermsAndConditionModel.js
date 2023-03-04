const mongoose = require("mongoose");
const terms_and_conditionsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    TermsAndCondition: String,
}
);
module.exports = mongoose.model("terms_and_conditions", terms_and_conditionsSchema);