const express = require("express");
const route = express.Router();
const {registerAdmin , loginAdmin} = require("../controller/adminController")
const {registerStudent , loginStudent} = require("../controller/studentController")
const {createQuestion , updateQuestion , getQuestionAdmin , getQuestionStudent , evalute} = require("../controller/questionController")

route.post("/admin/registeradmin" , registerAdmin)
route.post("/admin/loginadmin" , loginAdmin)

route.post("/student/registerstudent" , registerStudent)
route.post("/student/loginstudent" , loginStudent)

route.post("/question/createquestion" , createQuestion )
route.put("/question/update" , updateQuestion)
route.get("/question/getlistadmin" , getQuestionAdmin)
route.get("/question/getquestion" , getQuestionStudent)

route.post("/exam/evalute" , evalute)

module.exports = route