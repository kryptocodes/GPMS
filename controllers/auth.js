const User = require('../models/user')
const { check,validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');

exports.signin = (req,res) => {
    const {email,password} = req.body;
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
                error: "Credentials were Incorrect"
            })
        }
        //create token
    const token = jwt.sign({_id: user._id},process.env.SECRET)
    //put token in cookie
    res.cookie("token",token,{expire:new Date() + 999});
    //send response to front-end
    const {_id, name, email, role,dept,year} = user;
    return res.json({token, user:{_id,name,email,role,dept,year}})
    });
    
};


//signup 
exports.signup = (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    
    User.findOne(req.body.email).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
    })

    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err: "Not able to save user in dB"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            roll_no: user.roll_no,
            room_no: user.room_no,
            id: user._id
        });
    })
};

//faculty
exports.signup_faculty = (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne(req.body.email).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
    })
    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err: "Not able to save user in dB"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    })
};



exports.signout = (req,res) => {
    res.clearCookie("token")
    res.json({
        message:"User signout"
    })
}


//PROTECTED ROUTES
exports.isSignedIn = ejwt({
    secret:process.env.SECRET,
    userProperty: "auth"
});


//CUSTOM MIDDLEWARES

exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
}

exports.isWarden = (req,res,next)=>{
    if(!req.profile.role === 4){
        return res.status(403).json({
            error:  "ACCESS DENIED"
        })
    }
    next();
}