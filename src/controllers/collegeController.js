const collegeModel = require("../models/collegeModel.js")

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

//module.exports = { createCollege }
module.exports.createCollege = createCollege