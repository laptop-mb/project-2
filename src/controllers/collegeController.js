const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")


const createCollege = async function(req, res) {
    let college = req.body
    let {name, fullName , logoLink} = req.body
    let arr = Object.keys(req.body)

    if (typeof (name) != "string"  || typeof(fullName) != "string") {
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


    let Name = /^[a-zA-Z ]+$/.test(name)
    let fullname = /^[a-zA-Z ]+$/.test(fullName)

    if (Name == false || fullname == false) {
        return res.status(400).send({
         status: false,
         message: "Please enter letters only in name or fullname, don't enter special characters or digits"
    })
}

   if (name.includes(" ")) {
    return res.status(400).send({
         status: false, message: "Space is not allowed in name "
    })
}

let Name1 = name.toLowerCase();
     college =  college.Name1
  
    // let savecollege = await collegeModel.create(college)
    res.status(201).send({ status: true, data: "savecollege" })

}



const getCollegeDetails = async function(req, res){
    try {
        let data = req.query

    
            let verifyCollegeName = await collegeModel.findOne({ name: data.name })
            let findId = verifyCollegeName._id
            console.log(findId)
            //    console.log(verifyCollegeName)

        if (Object.keys(data).length == 0) {
            res.status(400).send({ status: false, msg: "please enter collegeName" })
        }

        let specificData = await collegeModel.findOne({collegeId: verifyCollegeName._id}).select({name:1 ,fullName:1,logoLink:1})
        let specificData2 = await internModel.find({collegeId: verifyCollegeName._id}).select({name: 1, email: 1, mobile: 1, collegeId: 1})
        console.log(specificData)
        if (specificData.length == 0) {
            res.status(404).send({ status: false, msg: "no such data found in the db with the given condition in the query" })

        }
        else {
            res.status(200).send({ status: true, msg: specificData , intern: specificData2})
        }
    }


    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}



module.exports.getCollegeDetails = getCollegeDetails;
module.exports.createCollege = createCollege;
