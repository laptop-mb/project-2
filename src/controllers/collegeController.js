const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validate = require('validator')
const { populate } = require("../models/collegeModel")

const createCollege = async function (req, res) {
    let college = {}
    college = req.body
    let { name, fullName, logoLink , isDeleted } = req.body
    let arr = Object.keys(req.body)



    if (typeof (name) != "string" || typeof (fullName) != "string") {
        return res.status(400).send({ status: false, message: "Give name or fullname  only in a String." })
    }

    if (arr.length > 4) {
        return res.status(400).send({
            status: false,
            message: "use name, fullName , logoLink isDeleted only"
        })
    }

    if (!name) {
        return res.status(400).send({ status: false, msg: "please provide valid name" })
    }
    if (!fullName) {
        return res.status(400).send({ status: false, msg: "please provide valid fullname" })
    }
    if (!logoLink) {
        return res.status(400).send({ status: false, msg: "please provide valid logolink" })
    }
    if (name.includes(" ")) {
        return res.status(400).send({
            status: false, message: "Space is not allowed in name "
        })
    }

    let Name = /^[a-z]+$/.test(name)
    if (Name == false) {
        return res.status(400).send({ status: false, msg: "name is only allowed in lowercase don't use special character or number" })
    }

    let fullname = /^[a-zA-Z ]+$/.test(fullName)
    if (fullname == false) {
        return res.status(400).send({
            status: false,
            message: "Please enter letters only in fullname, don't enter special characters or digits"
        })
    }
      
    if(fullName.trim().length==0){
        return res.status(400).send({status : false , msg : "blank space is not allowed in fullname"})
     }
        
     if(isDeleted){
        if(isDeleted != "false"){
            return res.status(400).send({status: false , msg :"isDeleted is only take boolean value false"})
        }
    }




    let checkname = await collegeModel.findOne({ name })
    if (checkname) {
        return res.status(200).send({ status: false, msg: "this name is already present in database" })
    }


    if (!validate.isURL(logoLink)) {
        return res.status(400).send({ status: false, msg: "URL is not valid " })
    }
       


     let savecollege = await collegeModel.create(college)


      let saveResponse = await collegeModel.findOne({_id : savecollege._id}).select({name : 1 , fullName : 1 , logoLink , isDeleted : 1, _id : 0} )
    res.status(201).send({ status: true, data: saveResponse })

}



const getCollegeDetails = async function (req, res) {
     try {
    let data = req.query


    let verifyCollegeName = await collegeModel.findOne({ name: data.collegeName })
    if (verifyCollegeName == null) {
        return res.status(404).send({ status: false, msg: "this college name is not found " })
    }

    if (Object.keys(data).length == 0) {
        res.status(400).send({ status: false, msg: "please enter collegeName" })
    }
        
  
      let specificData = await collegeModel.findOne({ _id: verifyCollegeName._id , isDeleted : false}).select({ name: 1, fullName: 1, logoLink: 1, _id: 0 })
      let specificData2 = await internModel.find({ collegeId: verifyCollegeName._id , isDeleted : false}).select({ name: 1, email: 1, mobile: 1 })

      let  Data = {
        name : specificData.name,
        fullName : specificData.fullName,
        logoLink : specificData.logoLink,
        interns  : specificData2
      }
       
    if (specificData.length == 0) {
        res.status(404).send({ status: false, msg: "no such data found in the db with the given condition in the query" })
   
    }
    else {
        res.status(200).send({ status: true, data: Data})
    }



    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}



module.exports.getCollegeDetails = getCollegeDetails;
module.exports.createCollege = createCollege;
