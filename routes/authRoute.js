const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')
const User = require('../models/userSchema')
const permission = require('../permission')
var jwt = require('jsonwebtoken');

// registration
router.post('/registration' , async (req,res) => {

    let {role='student',email} = req.body

    let per;

    permission.map(item=>{
        if(item.role == role){
            per = item.permission
        }
    })

    console.log(per);
    
    const user = await new User({
        email : email,
        role : role,
        permission : per
    }).save()

    res.json({
        data : user
    })
    
})

// login
router.post('/login' , async (req,res) => {
    let {email} = req.body

    const existingUser = await User.findOne({email:email})

    console.log(existingUser);
    
    // jwt.sign({data,secret,expire})

    let token = jwt.sign({
        _id : existingUser.id,
        email : existingUser.email,
        role : existingUser.role,
        permission : existingUser.permission
    },process.env.JWT_SECRET_ACCESS,{
        expiresIn : '1h'
    })

    res.json({
        accessToken : token
    })
})

function abc(req,res,next) {
    let token = req.headers.authorization;
    
    console.log(token.split(' ')[1]);

    jwt.verify(token.split(' ')[1],process.env.JWT_SECRET_ACCESS, function(err, decoded) {
        if(decoded.role == "student"){
            res.send('you do not have access')
        }
        else{
            next()
        }
    });
    
}

// privateData
router.get("/privatedata" , abc, async (req,res) => {
    await res.send('data')
})

module.exports = router