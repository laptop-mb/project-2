const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}

const internSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required: true, uniuqe: true},
    mobile:{tyep:String, required: true, uniuqe: true, },
    collegeId: {type: ObjectId, ref:("collegename"),  },
    isDeleted: {type: Boolean, default: false}

},{timestamps: true})
   

module.exports = mongoose.model('internname', internSchema)