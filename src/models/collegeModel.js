const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: 'abbrebation college name is required',
        trim : true
    },
    fullName: {
        type : String,
        required: 'college full name is required'
        
    },
    logoLink: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true });


module.exports = mongoose.model('collegename', collegeSchema)