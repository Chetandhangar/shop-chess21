const express = require('express')
const router = express.Router()
const {verifyToken} = require('../middlewares/auth.middleware.js');
const User = require('../models/user.model.js')

router.use(verifyToken);

router.route('/')
  .get(async(req,res) => {
    try{
      userId = req.user
      const user = await User.findById(userId).populate('wishlist')
      
      res.status(200).json({success : true, 
      message : "successfully fetch the wishlist",
      userId,
      wishlist : user.wishlist})
    }catch(error){
      res.status(501).json({success : false,
      message : "Unable to fetch the wishlist",
      errMessage : error.message
      })
    }
  })
  router.route('/add')
  .post(async(req,res) => {
    try{
     const  userId = req.user;
      const {productId} = req.body
       user = await User.findByIdAndUpdate({_id : userId},{
          $addToSet:{
                    wishlist:productId
                }
      })
      res.status(200).json({success : true,
      message : "Product Added to Cart successfully",
      wishlist : user.wishlist
      })    
    }catch(error){
      res.status(501).json({success : false,
      message : "Unable to add the product",
      errMessage : error.message
      })
    }
  })
  router.route('/remove')
  .post(async(req,res) => {
    try{
      const userId = req.user;
      const {productId}  = req.body;
      const user = await User.findById(userId)
      updatedWishlist = user.wishlist.pull(productId)
      updatedUser = await user.save();
      res.status(200).json({success : true,
      message : "Remove from wishlist successfully",
      wishlist : user.wishlist})

    }catch(error){
      res.status(501).json({succcess : false , 
      message : "Unable to delete the product",
      errMessage : error.message})
    }
  })

  

  module.exports = router