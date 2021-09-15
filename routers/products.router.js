const express = require("express")
const {extend} = require('lodash')
const routerProduct = express.Router()

const Product = require('../models/products.model.js')

routerProduct.route('/')
  .get(async (req,res) => {
    try{
      const products = await Product.find({})
    res.status(200).json({success : true , products}) 
    }catch(err){
      res.status(500).json({success : false, errMessage : "Unable to find the products",
      errorMessage : err.message
      })
    }
    
  })
  .post(async (req,res) =>{
    try{
    const product = req.body
    const newProduct = new Product(product)
    const products = await newProduct.save()
    res.json({success : true , products})
    }catch(err){
      res.status(500).json({success : false, errMessage : "unable to add the product",
      errorMessage: err.message})
    }
  })

//moddleware for getting productId
routerProduct.param('productId' , async(req,res,next,productId) => {
  try{
    const product = await Product.findById(productId)
    if(!product){
     return res.status(400).json({success : false, message : "could not find the product"})
    }
    req.product = product
    next()
  }catch{
    res.json({success : false , message : "error getting the product"})
  }
})


routerProduct.route('/:productId')
  .get((req , res ) => {
    let {product} = req
    product.__v = undefined
    res.json({success : true ,product})
  })
  .post(async(req,res) => {
    try{
    const updateProducts = req.body;
    let {product} = req
    product = extend(product, updateProducts)
    product = await product.save()
    res.json({success : true, product})
    }catch{
      res.json({success: false , errMessage : "error updating product"})
    }
  })
  .delete(async(req,res) => {
    let {product} = req;
     await product.remove()
     res.json({success : true, product})
  })

  module.exports = routerProduct