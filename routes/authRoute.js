const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')
const User = require('../models/userSchema')
const permission = require('../permission')

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

router.post('/login' , async (req,res) => {
    let {email} = req.body

    const existingUser = await User.findOne({email:email})
})

module.exports = router