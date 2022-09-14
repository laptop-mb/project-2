const internModel=require('../models/internModel')


const createIntern = async function(req, res) {
    try {
     let intern = req.body
     let {name, mobile, email, collegeId} = req.body
     let arr = Object.keys(req.body)
         if (typeof (name) != "string"){
        return res.status(400).send({ status: false, message: "Give name only in a String." })
   }



   if (arr.length > 5) {
    return res.status(400).send({
         status: false,
         message: "use only name, mobile, email, collegeId,isDeleted,only"
    })
}


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


    let Name = /^[a-zA-Z ]+$/.test(name)
    if (Name == false ) {
        return res.status(400).send({
         status: false,
         message: "Please enter letters only in name , don't enter special characters or digits"
    })
}
    let trimmer = name.trim()
    intern.name = trimmer
    console.log(intern)
    // if(name.trim()){
    //    return res.send("before after name space not allowed")
    // }

    //let savecollege = await internModel.create(intern)
    res.status(201).send({ status: true, data: "savecollege" })
        
    } catch (error) {
        res.send(error.message)
    }
}


module.exports.createIntern = createIntern;
