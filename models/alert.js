const mongoose = require("mongoose")

const alertSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    qualityCheckerID: String,
    errorCount: Number,
    createdDate: Number,
    status: String,
    reason: {type: String, required: true}
})
module.exports = mongoose.model("Alert", alertSchema)