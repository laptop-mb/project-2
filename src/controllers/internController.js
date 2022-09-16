const internModel = require('../models/internModel')
const validate = require('validator')
const mongoose = require('mongoose')
const collegeModel = require('../models/collegeModel')
const createIntern = async function (req, res) {
    try {
        let intern = req.body
        let { name, mobile, email, isDeleted ,CollegeName } = req.body
        let arr = Object.keys(req.body)


        if (!name) {
            return res.status(400).send({ status: false, msg: "please provide valid name" })
        }
        if (!mobile) {
            return res.status(400).send({ status: false, msg: "please provide valid mobile" })
        }
        if (!email) {
            return res.status(400).send({ status: false, msg: "please provide valid email" })
        }

        if (!CollegeName) {
            return res.status(400).send({ status: false, msg: "please provide valid CollegeName" })
        }
         



        if (typeof (name) != "string") {
            return res.status(400).send({ status: false, message: "Give name only in a String." })
        }

        if (name.trim().length == 0) {
            return res.status(400).send({ status: false, msg: "blank space is not allowed" })
        }

        if (arr.length > 5) {
            return res.status(400).send({
                status: false,
                message: "use only name, mobile, email, collegeId,isDeleted,only"
            })
        }

        if (isDeleted) {
            if (isDeleted != "false") {
                return res.status(400).send({ status: false, msg: "isDeleted is only take boolean value false" })
            }
        }


        let Name = /^[a-zA-Z ]+$/.test(name)
        if (Name == false) {
            return res.status(400).send({
                status: false,
                message: "Please enter letters only in name , don't enter special characters or digits"
            })
        }

        if (!validate.isEmail(email)) {
            return res.status(400).send({ status: false, msg: "email is not valid " })
        }


        let mobile1 = /^[6-9][0-9]+$/.test(mobile)
        if (mobile1 == false) {
            return res.status(400).send({ status: false, msg: 'please enter a valid mobile number' })
        }

        if (mobile.length < 10 || mobile.length > 10) {
            return res.status(400).send({ status: false, msg: "mobile no should be 10 digit" })
        }

        let emailsearch = await internModel.findOne({ email })
        if (emailsearch) {
            return res.status(409).send({ status: true, msg: "this email id is already registered" })
        }

        let mobilefound = await internModel.findOne({ mobile })
        if (mobilefound) {
            return res.status(409).send({ status: true, msg: "mobile no is already registered" })
        }


        let checkCollege = await collegeModel.findOne({name : CollegeName}) 
        if(!checkCollege){
            return res.status(404).send({status : false , msg : "college name not found "})
        }
        let collegeid = checkCollege._id
        
         intern.collegeId = collegeid
        let saveintern = await internModel.create(intern)
         let idofinter = saveintern._id
        let response = await internModel.find({_id : idofinter}).select({isDeleted : 1 ,name :1 , email : 1 , mobile : 1 , collegeId : 1 , _id : 0})

        res.status(201).send({ status: true, data: response })

    } catch (error) {

        res.status(500).send(error.message)
        
    }
}
module.exports.createIntern = createIntern;
