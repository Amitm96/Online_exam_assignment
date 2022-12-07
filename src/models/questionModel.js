const mongoose = require("mongoose");

let questionSchema = new mongoose.Schema({
    question : String , 
    mark : String ,
    options : [String],
    answer : String
}, {timestamps : true})

module.exports = mongoose.model("question" , questionSchema)