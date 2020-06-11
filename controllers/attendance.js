const Atten = require("../models/attendance")

exports.getAttenById = (req,res,next,id)=>{
    Atten.findById(id)
    .populate("student","-salt -encry_password")
    .exec((err,atten)=>{
        if(err){
            return res.status(400).json({
                error: "Data not found in dB"
            })
        }
        req.Atten = atten;
        next();
    })
}


exports.addAtten = (req,res) => {
    const atten = new Atten(req.body)
    atten.save((err,atten) =>{
        if(err){
            return res.status(400).json({
                error: "unable to register attendance"
            })
        }
        res.json({atten})
    })
}



exports.getAtten = (req,res) => {
    Atten.find()
    .populate("student","-salt -encry_password")
    .exec((err,atten) => {
        if(err){
            return res.status(400).json({
                error:"Unable to retrive data from dB"
            })
        }
        res.json(atten)
    })
}