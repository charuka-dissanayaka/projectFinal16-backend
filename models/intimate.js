const mongoose = require("mongoose")

const Schema =mongoose.Schema
const intimateSchema = new Schema({
    matrix: { type: mongoose.Schema.Types.Mixed, default: [] }
})
module.exports = mongoose.model("Intimate", intimateSchema)