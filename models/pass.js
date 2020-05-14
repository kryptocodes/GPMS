const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const passSchema = new mongoose.Schema({
    info:{
        type: ObjectId,
        ref:"User"
    },
    pass_type:{
        type:String,
        default:"Home Pass",
        enum:["Out Pass","Home Pass"]
    },
    status: {
        type: String,
        default: "Approved",
        enum:["Denied","Processing","Approved"]
    },
    updated:Date,
},{timestamps:true}
)





module.exports = mongoose.model("pass",passSchema)