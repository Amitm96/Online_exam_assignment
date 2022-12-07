const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    Name : String ,
    email : String ,
    password : String ,
    examGiven : {type : Boolean , default : false} ,
    Marks : {type : Number , default : 0}
}, {timestamps : true})

module.exports = mongoose.model("student" , studentSchema)