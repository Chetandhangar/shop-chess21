var mongoose = require('mongoose');
require('mongoose-type-url');
const {Schema} = mongoose;



const ProductSchema = new Schema({
 
  name: { 
    type: String, 
    required: "Cannot enter a product without name, please enter product name"
  },

  price: {
    type: Number,
    required: "Cannot enter a product without price, please enter price of the product"
  },

  imageurl: {
    type: mongoose.SchemaTypes.Url,
    required: "Cannot enter a product without Image URL, please enter Image URL of the product",
  },
  isMagnetic : {
    type : Boolean,
    required : "please mentioned whether product is magnetic or not"
  },
  isWooden : {
    type : Boolean,
    required : "please mentioned whether product is Wooden or not"
  },
  isFolding : {
    type : Boolean,
    required : "please mentioned whether product is Folding or not"
  },

  description: {
    type: String,
    minLength: [10, "Description must be 300 characters or more"]
  },
},{
  timestamps : true
});

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product;

     
