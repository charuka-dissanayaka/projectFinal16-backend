const mongoose = require("mongoose")

const Schema =mongoose.Schema
const userSchema = new Schema({
   // username: String,{type:String,unique:true},
    email:String,
    password: String,
    firstName:String,
    lastName:String,
    role: String,
    rowId: String,
    telephoneNo: String,
    managerId:String,
    imageUrl: String
})
module.exports = mongoose.model("users", userSchema)