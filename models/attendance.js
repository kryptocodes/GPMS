const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const attenSchema = new mongoose.Schema({
    student:{
        type: ObjectId,
        ref: "User"
    },
    status:{
        type:String
    },
    date:{
        type:String
    }
},{timestamps:true})




module.exports = mongoose.model("Atten",attenSchema)