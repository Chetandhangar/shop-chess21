const express = require('express')
const router = express.Router()
const {verifyToken} = require('../middlewares/auth.middleware.js');
const User = require('../models/user.model.js')


router.use(verifyToken)
router.route('/')
.get(async(req,res) =>{
  const userId = req.user;
  try{
    const user = await User.findById(userId).populate('cart.product')
    res.status(200).json({
      success : true , 
      userID : userId,
      cart : user.cart
    })
  }catch(err){
    res.status(501).json({
       success : false , errMessage : "Error while getting cart"
    })
  }
})
router.route('/add')
.post(async(req,res) => {
   try{
            const userId = req.user
            const {productId} = req.body
            const user = await User.findById(userId)
            const isProductPresent = user.cart.find(({product})=>String(product) === productId)
            if(isProductPresent){
                const index = await user.cart.findIndex(({product}) => String(product) === productId)
                user.cart[index].quantity = user.cart[index].quantity+1
                const updatedCart = await user.save()
                res.json({success:true,message:"Product quantity updated",cart:updatedCart.cart})

            }else{
                user.cart.push({product:productId,quantity:1})
                const updatedCart = await user.save()
                res.json({success:true,message:"Product successfully added",cart:updatedCart.cart})
            }
        }catch(err){
            res.json({success:false,error:err.message})
        }
})

router.route('/remove')
.post(async(req,res)=>{
  try{
  const userId = req.user;
  const {productId} = req.body
  const user = await User.findById(userId);
  const index = await user.cart.findIndex(({product}) => String(product) === productId)

  if(user.cart[index].quantity === 1){
    user.cart.splice(index,1)
    const updatedUserCart = await user.save();
    res.status(200).json({success : true,
    message : "Product remove Successfully",
    cart : updatedUserCart.cart})
  }else{
    user.cart[index].quantity = user.cart[index].quantity - 1;
    const updatedUserCart = await user.save()
    res.status(200).json({success : true,
    message : "Product quantity updated",
    cart : updatedUserCart})
  }
  }catch(error){
    res.status(501).json({success : false,
    errMessage : error.message , 
    message : "Unable to remove product from cart"})
  }
})

module.exports = router