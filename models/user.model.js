var mongoose = require('mongoose')
require('mongoose-type-url')
const {Schema} = mongoose;
const Product = require('./products.model.js')

const cartSchema = new Schema({
    product:{type:Schema.Types.ObjectId, ref:Product},
    quantity: Number
})

const UserSchema = new Schema({
  firstname : {
    type : String,
    required: "Please provide the firstName"
  },
  lastname : {
    type : String,
    required : "Please provide the lastname"
  },
  email : {
    type : String,
    required : "Please provide the email"
  },
  username :{
    type : String,
    required : "Please Provide the username",
     unique : [true , "username is already exist"]
  },
  password : {
    type : String,
    required : "Please provide the password"
  },
  wishlist : [{
    type:Schema.Types.ObjectId,
    ref : Product
  }],
  cart: [cartSchema]
}, {
  timestamps : true
})

const User = mongoose.model('User', UserSchema)

module.exports = User