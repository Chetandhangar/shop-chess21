const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')


const dbConnection = require('./db/db.js')
dbConnection()

const router = require('./category.router.js')
const routerProduct = require('./routers/products.router.js')
const routerUser = require('./routers/users.router.js');
const routerCart = require('./routers/cart.router.js');
const routerWishlist = require('./routers/wishlist.router.js')

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use("/users",routerUser)
app.use("/categories", router)
app.use('/products' , routerProduct)
app.use('/cart',routerCart)
app.use('/wishlist', routerWishlist)


app.get('/', (req, res) => {
  res.json({ success : true, message :'Hello Wrold'})
});





/*
* 404 route handler
* Note : Do not move .This should be the last route
*Note : create sep funtion for those handlers
*/
app.use(function(req,res){
  res.status(404).json({success : false, message : "route not found on server"})
})

app.use(function(err,req,res,next){
  res.status(501).json({
    success : false , message : "see the more errMesagge for more details" , errMessage : err.message
  })
})

app.listen(process.env.PORT || 3000,() => {
  console.log('server started');
});