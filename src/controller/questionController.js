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
        if (!options) {
            return res.status(400).send({ status: false, msg: "Enter options" })
        }
        if (options.length != 4) {
            return res.status(400).send({ status: false, msg: "there should be 4 option present" })
        }
        for (let opt of options) {
            if (opt.trim().length == 0) {
                return res.status(400).send({ status: false, msg: "option field should not empty" })
            }
        }
        options = options.map((e) => e.toLowerCase())
        if (!answer.trim()) {
            return res.status(400).send({ status: false, msg: "Enter answer" })
        }
        if (!options.includes(answer.trim().toLowerCase())) {
            return res.status(400).send({ status: false, msg: "answer should be from the options" })
        }
        let nquestion = await questionModel.create({ question: question, mark: mark, options: options, answer: answer.trim().toLowerCase() })
        return res.status(201).send({ status: true, msg: nquestion })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

async function getQuestionAdmin(req, res) {
    try {
        let qstnlst = await questionModel.find()
        return res.status(200).send({ status: true, msg: qstnlst })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

async function getQuestionStudent(req, res) {
    try {
        let qList = await questionModel.aggregate([{ $sample: { size: 10 } }])
        qList = qList.map((e) => {
           return {_id : e._id ,question : e.question , options : e.options}
        })
        return res.status(200).send({status : true , msg : qList})
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

async function evalute(req , res){
    try{
    console.log(req.body)
    let {responce }= req.body
    let qIds = responce.map((e) => e.id)
    let questions = await questionModel.find({_id : {$in : qIds}});
    let mobtain = 0
    let correctAnswrs = []
    for(let i=0; i<responce.length; i++){
        if(responce[i].answer == questions[i].answer){
            mobtain += 5
        }
        let qna = {"question" : questions[i].question , "answer" : questions[i].answer}
        correctAnswrs.push(qna)
    }
    let prcntg = (mobtain / (responce.length * 5)) * 100
    let result = {Totalmarks : responce.length * 5 ,MarksObtain : mobtain , percentage : `${prcntg} %` , correctAnswers : correctAnswrs}
    return res.status(200).send({status : true , msg : result})
    }
    catch(err){
        return res.status(500).send({ status: false, msg: err.message })
    }
}

async function updateQuestion(req, res) {
    try {
        let { question, mark, options, answer } = req.body
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "Enter details" })
        }
        if (!question.trim()) {
            return res.status(400).send({ status: false, msg: "Enter question" })
        }
        let equestion = await questionModel.findOne({ question: question })
        if (mark) {
            if (!/[0-9]/.test(mark)) {
                return res.status(400).send({ status: false, msg: "Enter correct mark" })
            }
            equestion.mark = mark
        }

        if (options) {
            if (options.length != 4) {
                return res.status(400).send({ status: false, msg: "there should be 4 option present" })
            }
            for (let opt of options) {
                if (opt.trim().length == 0) {
                    return res.status(400).send({ status: false, msg: "option field should not empty" })
                }
            }
            options = options.map((e) => e.toLowerCase())
            equestion.options = options
        }
        if (answer.trim()) {
            if (!options.includes(answer.trim().toLowerCase())) {
                return res.status(400), send({ status: false, msg: "answer should be from the options" })
            }
            equestion.answer = answer.trim().toLowerCase()
        }
        await equestion.save()
        return res.status(200).send({ status: true, msg: equestion })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { createQuestion, updateQuestion, getQuestionAdmin, getQuestionStudent , evalute }