const Pass = require("../models/pass")


exports.getPassById = (req,res,next,id) => {
    Pass.findById(id)
    .populate("pass")
    .exec((err,pass)=>{
        if(err){
            return res.status(400).jsom({
                error:"No pass applied"
            })
        }
        req.pass = Pass
        next()
    })
}



