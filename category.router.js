const express = require("express")
const router = express.Router()

const categories = [
  {
    id : 1,
    name : "wooden"
  },
  {
    id : 3,
    name : "magnetic"
  }
]


//"/products"
router.route('/')
  .get((req,res) =>{
  res.json({categories})
})
  .post((req,res) =>{
  const {name} = req.body
  const category = {id : Id++, name }
  categories.push(category)
  res.json({categories , success : true})
})

//"/Products/:id"
router.route('/:id')
  .get((req,res) =>{
  const {id} = req.params
  const category = categories.find(category => category.id == id)
  res.json(category)
})
.post((req,res)=>{
  const { id } = req.params
  const newCategory = req.body
  categories.forEach((product) =>{
    if(product.id == id){
      Object.keys(newCategory).forEach(key => {
        if(key in product){
          product[key] = newCategory[key]
          console.log(product[key])
        }
      })
    }
  })

res.json({categories , success : true})
})




module.exports = router