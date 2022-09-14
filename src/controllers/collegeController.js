const collegeModel = require("../models/collegeModel")


const createCollege = async function(req, res) {
    let college = req.body
    let name = req.body.name
    let fullName = req.body.fullName
    let logoLink = req.body.logoLink


    if (!name) {
        return res.status(400).send({ status: false, msg: "please provide valid name" })
    }
    if (!fullName) {
        return res.status(400).send({ status: false, msg: "please provide valid fullname" })
    }
    if (!logoLink) {
        return res.status(400).send({ status: false, msg: "please provide valid logolink" })
    }
    let savecollege = await collegeModel.create(college)
    res.status(201).send({ status: true, data: savecollege })

}


const getCollegeDetails = async function (req, res){
    try {
        let data = req.query
        const collegeName = data

        if (collegeName) {
            let verifyCollegeName = await collegeModel.find({ collegeName: collegeName })
            if (!verifyCollegeName) {
                res.status(404).send({ status: false, msg: "no such collegeName exist" })
            }
        }

        

        if (Object.keys(data).length == 0) {
            res.status(400).send({ status: false, msg: "bhai query me kuch to dalo re" })
        }

        let specificData = await collegeModel.find(data).populate("collegename")
        if (specificData == 0) {
            res.status(404).send({ status: false, msg: "no such data found in the db with the given condition in the query" })

        }
        else {
            res.status(200).send({ status: true, msg: specificData })
        }
    }


    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}



module.exports.getCollegeDetails = getCollegeDetails;
module.exports.createCollege = createCollege;
