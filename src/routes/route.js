const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController.js")
const InternController=require("../controllers/internController")


router.post("/functionup/colleges",collegeController.createCollege)
router.post("/functionup/interns",InternController.createIntern)
router.get("/functionup/collegeDetails",collegeController.getCollegeDetails)


module.exports = router