const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema


const passSchema = new mongoose.Schema({
    info:{
        type: ObjectId,
        ref: "User"
    },
    exp_dep_time:{
        type:String,
    },
    exp_arr_time:{
        type:String,
    },
    from_date:{
        type:String,
    },
    to_date:{
        type:String,
    },
    reason:{
        type:String,
        maxlength:128
    },
    status:{
        type:Number,
        default:0,
    },
    updated:Date,
},{timestamps:true}
)





module.exports = mongoose.model("Pass",passSchema)