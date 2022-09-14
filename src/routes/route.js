const express = require('express');
const router = express.Router();
const collegeModel = require("..models/collegeModel")


// 1 create college 
router.post("//functionup/colleges", collegeModel.createcollege)