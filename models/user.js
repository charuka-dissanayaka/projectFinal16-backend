const mongoose = require("mongoose")

const Schema =mongoose.Schema
const userSchema = new Schema({
   // username: String,
    email: String,
    password: String,
    firstName:String,
    lastName:String,
    role: String,
    rowId: Number,
    telephoneNo: Number,
    managerId:String,
})
module.exports = mongoose.model("users", userSchema)