const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
async function registerAdmin(req , res){
    try{
    let {Name , email , password} = req.body
    if (Object.keys(req.body).length == 0) {
        return res.status(400).send({ status: false, msg: "Enter details of the user" })
    }
    if (!Name.trim()) {
        return res.status(400).send({ status: false, msg: "please enter Name" })
    }

    if (!/^[a-zA-Z ]*$/.test(Name.trim())) {
        return res.status(400).send({ status: false, msg: "Enter a valid Name" })
    }
    if (!email) {
        return res.status(400).send({ status: false, msg: " please enter email" })
    }

    if (!/^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(email)) {
        return res.status(400).send({ status: false, message: "Entered email is invalid" });
    }

    let existemail = await adminModel.findOne({ email: email })
    if (existemail) {
        return res.status(400).send({ status: false, msg: "this email is already resister in our Database" })
    }
    if (!password) {
        return res.status(400).send({ status: false, msg: "please enter password" })

    }
    if(password.trim().length <8 || password.trim().length > 15){
        return res.status(400).send({status : false , msg : "password length should be 8 - 15 character"})
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    let nAdmin = await adminModel.create({Name : Name , email : email , password : password})
    return res.status(201).send({status : true , msg : nAdmin})
    }
    catch(err){
        return res.status(500).send({status : false , msg : err.message})
    }
}

async function loginAdmin(req , res){
    try {
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "plese provide credential" })
        }
        if (!req.body.email) {
            return res.status(400).send({ status: false, msg: "plese enter email in body" })
        }
        if (!req.body.password) {
            return res.status(400).send({ status: false, msg: "plese enter password in body" })
        }
        let existAdmin = await adminModel.findOne({ email: req.body.email })
        if (!existAdmin) {
            return res.status(401).send({ status: false, msg: "invalid credincial" })
        }
        let validPassword = await bcrypt.compare(req.body.password, existAdmin.password)
        if (!validPassword) {
            return res.status(401).send({ status: false, msg: "invalid credincial" })
        }

        let token = jwt.sign({
            adminId: existAdmin._id.toString(),
            isAdmin : true ,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24

        }, "adminloginjwt")

        return res.status(200).send({ status: true, msg: token })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = {registerAdmin , loginAdmin}