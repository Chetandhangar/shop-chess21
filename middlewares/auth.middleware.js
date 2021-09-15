const express = require('express')
const User = require('../models/user.model.js')
const bcrypt = require('bcryptjs')
let Secret = "123-456-789-987-654-321";
const jwt = require('jsonwebtoken')

async  function verifyLogin(req,res,next){
  try{
    const {username , password} = req.body
    const user =await User.findOne({username})
    if(!user){
      res.status(400).json({success : false , errMessage : "User with that username in not found"})
    }
    if(user){
    const isValidPassword =  await bcrypt.compare(password,user.password)
    if(isValidPassword){
      req.user = user
      return next()
    }else{
        return res.status(401).json({success:false,message:"Authentication failed"})
    }
    }
  }catch(err){
    res.status(500).json({success : false , errMesssage : err.message,
    })
  }
}


 function verifyToken(req,res,next){
  let token  = req.headers.authorization
  try{
    var decode = jwt.verify(token, Secret)
      req.user = decode.userId
       return next()
    }catch{
        return res.status(401).json({success:false,message:"Unauthorized Access"})
    }
  
}


module.exports = {verifyLogin, verifyToken}