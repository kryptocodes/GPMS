const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "No user was found in DB"
        });
      }
      req.profile = user;
      next();
    });
  };

exports.getUser = (req, res) =>{
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile)
}

exports.getStudentInfo = (req,res) =>{
  User.find({role:0,dept:req.profile.dept})
  .select('-salt -encry_password')
  .exec((err,user) => {
    if(err){
      return res.status(400).json({
        error:"No Student found in dB"
      })
    }
    res.json(user)
  })
}

exports.getStudent = (req,res) =>{
  User.find({role:0})
  .select('-salt -encry_password')
  .exec((err, user) => {
      if(err){
          return res.status(400).json({
              error: "No student found in dB"
          });
      }
      res.json(user)
  })
};

exports.updateUser = (req,res) =>{
    User.findByIdAndUpdate(
      {_id: req.profile._id},
      {$set: req.body},
      {new: true,useFindAndModify: false},
      (err,user) =>{
        if(err){
          return res.status(400).json({
            error:"you are not authorized to update this user"
          })
        }
        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user)
      }    
    )
  }


exports.updatePassword=(req,res)=>{
    const {password} = req.body;
    User.findOne(
      {_id:req.profile._id},
      (err,user) => {
        if(err || !user){
          return res.status(400).json({
            error:"User not found"
          })
        }
        if(password){
          if(password.length<8){
            return res.status(400).json({
              error:"Password should be min 8 characters long"
            })
          } else {
            user.password = password
          }
        }
        user.save((err,updated) => {
          if(err){
            return res.status(400).json({
              error: "user updated failed"
            })
          }
          updated.salt = undefined;
          updated.encry_password = undefined;
          res.json(updated)
        })
      })
}


