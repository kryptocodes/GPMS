const Pass = require("../models/pass")


exports.getPassById = (req,res,next,id)=>{
    Pass.findById(id)
    .populate("user")
    .exec((err, pass)=>{
        if(err){
            return res.status(400).json({
                error: "Pass not found in dB"
            })
        }
        req.Pass = pass;
        next();
    })
}

exports.createHomePass = (req,res) => {
    const pass = new Pass(req.body)
    pass.save((err,pass) =>{
        if(err){
            return res.status(400).json({
                error: "unable to create pass"
            })
        }
        res.json({pass})
    })
}



exports.getPass = (req,res) => {
    req.Pass.user.salt = undefined;
    req.Pass.user.encry_password = undefined;
    return res.json(req.Pass)
}









