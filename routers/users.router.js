const express = require("express")
const {extend} = require('lodash')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {verifyLogin} = require('../middlewares/auth.middleware.js')

const verifyToken  = require('../middlewares/auth.middleware.js')
const User = require('../models/user.model.js')

let Secret = "123-456-789-987-654-321"

router.route('/')
  .get(async (req,res) => {
    try{
      const user = await User.find({})
      res.json({success : true, user})
    }catch(error){
      res,json({success : false , errMessage : error.message})
    }  
  })
 


 router.route('/signup')
  .post(async(req,res) => {
    try{
      console.log("called signup")
    const user = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password,salt)
    user.password = hashedPassword;
    const newUser = new User(user)
    const addedUser = await newUser.save()
    res.status(200).json({success : true, user : addedUser})
    }catch(error){
      res.status(500).json({success : false , 
      errMessage : error.message})
    }
  })
  router.use(verifyLogin)

  router.route('/login')
    .post(async(req,res) => {
      try{
        const  user = req.user;
        const token = jwt.sign({userId : user._id},Secret, {expiresIn: "48h"})
        res.status(200).json({success : true, 
        message : "Login Successfully", username : user.username, token
        })
      }catch(error){
        res.status(401).json({success : false ,
        errMessage : error.message,})
      }
    })



module.exports = router