const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const passSchema = new mongoose.Schema({
    user:{
        type: ObjectId,
        ref:"User",
        required:true
    },
    exp_dep_time:{
        type:String,
        required:true
    },
    exp_arr_time:{
        type:String,
        required: true
    },
    from_date:{
        type:String,
        required: true
    },
    to_date:{
        type:String,
        required: true
    },
    reason:{
        type:String,
        maxlength:128,
        required:true
    },
    status:{
        type:Number,
        default:0,
    },
    updated:Date,
},{timestamps:true}
)





module.exports = mongoose.model("Pass",passSchema)