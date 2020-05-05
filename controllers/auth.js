const User = require('../models/user')
const { check,validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');

exports.signin = (req,res) => {
    const {email , password} = req.body;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    
    User.findOne({email},(err,user) => {
        if(err || !user){
            return res.status(400).json({
                error:"User Email does not exist"
            });
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password do not match"
            })
        }
        //create token
    const token = jwt.sign({_id: user._id},process.env.SECRET)
    //put token in cookie
    res.cookie("token",token,{expire:new Date() + 999});
    //send response to front-end
    const {_id, name, email, role} = user;
    return res.json({token, user:{_id,name,email,role}})
    });
    
};

export.signout = (req,res) => {
    res.json({
        message:"User signout";
    })
}