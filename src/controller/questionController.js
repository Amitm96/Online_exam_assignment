const questionModel = require("../models/questionModel")

async function createQuestion(req, res) {
    try {
        let { question, mark, options, answer } = req.body
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "Enter details" })
        }
        if (!question.trim()) {
            return res.status(400).send({ status: false, msg: "Enter question" })
        }
        if (!mark) {
            return res.status(400).send({ status: false, msg: "Enter mark" })
        }
        if (!/[0-9]/.test(mark)) {
            return res.status(400).send({ status: false, msg: "Enter correct mark" })
        }
        if(!options){
            return res.status(400).send({ status: false, msg: "Enter options" })
        }
        if(options.length != 4){
            return res.status(400).send({status : false , msg : "there should be 4 option present"})
        }
        for(let opt of options){
            if(opt.trim().length == 0){
                return res.status(400).send({status : false , msg : "option field should not empty"})
            }
        }
        if(!answer.trim()){
            return res.status(400).send({ status: false, msg: "Enter answer" })
        }
        if(!options.includes(answer.trim())){
            return res.status(400),send({status : false , msg : "answer should be from the options"})
        }
        let nquestion = await questionModel.create({question : question , mark : mark , options : options , answer : answer})
        return res.status(201).send({status : true , msg : nquestion})
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = {createQuestion}