const internModel=require('../models/internModel')


const createIntern = async function(req, res) {
    let intern = req.body
    let name = req.body.name
    let mobile = req.body.mobile
    let email = req.body.email
    let collegeName = req.body.collegeName


    if (!name) {
        return res.status(400).send({ status: false, msg: "please provide valid name" })
    }
    if (!mobile) {
        return res.status(400).send({ status: false, msg: "please provide valid mobile" })
    }
    if (!email) {
        return res.status(400).send({ status: false, msg: "please provide valid email" })
    }
    if (!collegeName) {
        return res.status(400).send({ status: false, msg: "please provide valid collegeName" })
    }
    let savecollege = await internModel.create(intern)
    res.status(201).send({ status: true, data: savecollege })

}

module.exports.createIntern = createIntern;
