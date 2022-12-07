const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    Name : String ,
    email : String ,
    password : String
}, {timestamps : true})

module.exports = mongoose.model("admin" , adminSchema)