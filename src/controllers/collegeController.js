const collegeModel = require("../models/collegeModel")



const createcollege = async function (req, res) {
    let college = req.body
    let name = req.body.name
    let fullName = req.body.fullName
    let logolink = req.body.logolink


    if (!name) {
        return res.status(400).send({ status: false, msg: "please provide valid name" })
    }
    if (!fullName) {
        return res.status(400).send({ status: false, msg: "please provide valid fullname" })
    }
    if (!logolink) {
        return res.status(400).send({ status: false, msg: "please provide valid logolink" })
    }
    let savecollege = await collegeModel.create(college)
    res.status(201).send({ status: true, data: savecollege })

}