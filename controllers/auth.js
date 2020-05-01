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
