const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")



const getCollegeDetails = async (req, res){
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


module.exports.getCollegeDetails = getCollegeDetails