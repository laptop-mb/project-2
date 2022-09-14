const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}

const internSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: 'intern name is required',
        trim : true
    },
    email: {
        type: String, 
        trim : true ,
        lowercase : true,
        required: 'Email address is required',
         uniuqe: true,
         validate : {
            validator : function(email) {
                   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            } , message : 'please fill a valid email address', isAsync : false
         }
        },
    mobile:{
        type:Number,
         required: "mobile no mandatory",
          uniuqe: true, 
        //   validate : {
        //     validator : function (mobile){
        //         return ("(0|91)?[6-9][0-9]{9}").match(mobile)
        //     }, message : 'please enter a valid mobile number'
        //   }
        },
    collegeId: {
        type: ObjectId, 
        ref:"collegename"
      },
    isDeleted: {
        type: Boolean, 
        default: false
    }

},{timestamps: true})
   

module.exports = mongoose.model('internname', internSchema)