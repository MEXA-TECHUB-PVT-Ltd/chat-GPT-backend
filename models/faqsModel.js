const mongoose = require("mongoose");
const faqsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    question:String,
    answer:String,
}
);
module.exports = mongoose.model("faqs", faqsSchema);