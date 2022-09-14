const internModel=require('../models/internModel')


const createIntern = async function(req, res) {
    try {
        let intern = req.body
    let name = req.body.name
    let mobile = req.body.mobile
    let email = req.body.email
    let collegeId = req.body.collegeId


    if (!name) {
        return res.status(400).send({ status: false, msg: "please provide valid name" })
    }
    if (!mobile) {
        return res.status(400).send({ status: false, msg: "please provide valid mobile" })
    }
    if (!email) {
        return res.status(400).send({ status: false, msg: "please provide valid email" })
    }
    if (!collegeId) {
        return res.status(400).send({ status: false, msg: "please provide valid collegeId" })
    }
    let savecollege = await internModel.create(intern)
    res.status(201).send({ status: true, data: savecollege })
        
    } catch (error) {
        res.send(error.message)
        
    }

}

module.exports.createIntern = createIntern;
