var express = require("express");
var app = express();

var myroutes = require('./routes');

app.use('/products', myroutes.productRoutes);
app.use('/categories', myroutes.categoryRoutes);

// app.use(async(req, res, next) => {
//   const categories = await 
// });


app.listen(3000, () => {
    console.log("Express intro running on localhost:3000");
  });


