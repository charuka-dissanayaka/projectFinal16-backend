const mongoose = require("mongoose")

const Schema =mongoose.Schema
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    firstname:String,
    lastname:String,
    role: String,
    rowId: Number
})
module.exports = mongoose.model("User", userSchema)