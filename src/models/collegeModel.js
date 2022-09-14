const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    fullName: {
        required: true
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