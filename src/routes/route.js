const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController.js")


// 1 create college 
router.post("/functionup/colleges",collegeController.createCollege)


module.exports = router