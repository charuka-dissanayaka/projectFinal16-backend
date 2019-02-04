const mongoose = require("mongoose")

const coodinateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    qualityCheckerID: String,
    coordinates: { type: Array, required: true },
    createdDate: Number,
    imageUrl: String,

})
module.exports = mongoose.model("Coodinate", coodinateSchema)