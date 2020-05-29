const Pass = require("../models/pass")

exports.getPassById = (req,res,next,id)=>{
    Pass.findById(id)
    .populate("info","-salt -encry_password")
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


//display pass
exports.getPass = (req,res) => {
    var passID = {_id: req.params.passId};
    Pass.findOne(passID,(err,pass) =>{
        if(pass == null){
            return res.status(400).json({
                error:"No pass found"
            })
        }
        else{
            return res.json(req.Pass)
        }
    })
}

exports.updatePass = (req,res) => {
    Pass.updateOne(
        {_id: req.Pass._id},
        {$set:req.body},
        (error,pass)=>{
            if(error){
                return res.status(400).json({
                    error:"No pass found"
                  });
                }
                res.json(pass);
              }
            );
          };

exports.updatePost = (req,res) => {
    Pass.updateOne(
        { _id: req.Pass._id},
        {$set:{exit:req.body.exit,entry:req.body.entry}},
        (error, pass) => {
            if (error) {
              return res.status(400).json({
                error:"No pass found"
              });
            }
            res.json(pass);
          }
    )
}

exports.updateStatus = (req, res) => {
    Pass.updateOne(
      { _id: req.Pass._id},
      { $set: { status: req.body.status } },
      (error, pass) => {
        if (error) {
          return res.status(400).json({
            error:"No pass found"
          });
        }
        res.json(pass);
      }
    );
  };


//display pass for the user
exports.getUserPass = (req,res) => {
    Pass.find({info:req.profile._id})
    .populate("info","-salt -encry_password")
    .sort('-createdAt')
    .exec((err, pass)=>{
        if(err){
            return res.status(400).json({
                error: "No pass found"
            });
        }
        res.json(pass);
    })
}

//display student pass
exports.getFacultyPass = (req,res) => {
    Pass.find({status:"Under Process",dept:req.profile.dept,year:req.profile.year})
    .populate("info","-salt -encry_password")
    .exec((err,pass) =>{    
        if(err){
            return res.status(400).json({
                error:"No pass found"
            });
        }
        res.json(pass);
    })
}

//read all pass
exports.getAllPass = (req,res) =>{
    Pass.find().populate("info","-salt -encry_password").exec((err, pass)=>{
        if(err){
            return res.status(400).json({
                error: "No pass found"
            });
        }
        res.json(pass);
    })
};

exports.deletePass = (req,res) => {
    let pass = req.Pass;
    pass.remove((err,pass) =>{
        if(err)
        {
            return res.status(400).json({
                error:"failed to delete the pass"
            })
        }
        res.json({
            message:"Deletion was successful"
        })
        })
}