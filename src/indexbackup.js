//import productCategroyList  from "./data/memory/objects";
const productCategroyList = [
    { id: 1, name: "Chocolate", description: "sweet" },
    { id: 2, name: "Bread", description: "bakery stuff" },
    { id: 3, name: "Milk", description: "Dairy" },
  ];
  
  const prodList = [
    {
      id: 1,
      name: "Milka",
      description: "Milk chocolate",
      price: 10,
      Weight: 100,
      category: productCategroyList[0],
    },
    {
      id: 2,
      name: "Poiana",
      description: "Milk chocolate",
      price: 8,
      Weight: 100,
      category: productCategroyList[0],
    },
    {
      id: 3,
      name: "LaDorna",
      description: "Milk 1,5% ",
      price: 5,
      Weight: 1,
      category: productCategroyList[2],
    },
    {
      id: 4,
      name: "Cibatta",
      description: "Cibatta",
      price: 10,
      Weight: 500,
      category: productCategroyList[1],
    },
  ];
  
  var express = require("express");
  var bodyParser = require('body-parser')
  var app = express();
  var jsonParser = bodyParser.json();
  
  //Reading all categoriesaham
  
  const getAllCategories = (request, res, next) => {
    //console.log("in func");
    res.status(200).json(productCategroyList);
    next();
  };
  
  //Reading all products in a given category (by id),
  const getProductsByCatId = (req, res, next) => {
    let result = [];
    console.log(typeof(req.params.catId));
  
    for (var i = 0; i < prodList.length; i++) {
      if (prodList[i].category.id == req.params.catId) {
        result.push(prodList[i]);
      }
    }
    res.status(200).json(result);
    next();
  };
  
  function createNewProdId() {
    let newId = 0;
    for (var i = 0; i < prodList.length; i++) {
      if (newId <  prodList[i].id) {
        newId = prodList[i].id;
      } 
    };
    return newId + 1 ;
  };
  
  //Reading all products in a given category (by id),
  const getProductsById = (req, res, next) => {
    //console.log("in func");
    res.status(200).json(prodList.find((el) => el.id == req.params.prodId));
    next();
  };
  
  const createProductById = (req, res, next) => {
    //console.log("in func");
    // create new id
    let newId = createNewProdId();
    let pos = productCategroyList.indexOf(  productCategroyList.find((el) => el.id == req.params.catId) );
  
    prodList.push({ id: newId,
      name: req.body.name,
      description:  req.body.description,
      price:  req.body.price,
      Weight:  req.body.Weight,
      category: productCategroyList[pos],} );
  
    //console.log( prodList);
    //res.statusMessage = "create success";
    //res.status(201).json( prodList);
    res.status(201).end();
    next();
  };
  
  const updateProductById = (req, res, next) => {
    //console.log("in func");
    let pos =  prodList.indexOf(   prodList.find((el) => el.id == req.params.prodId) );
  
    if ( req.body.name) { prodList[pos].name =  req.body.name } ;
    if ( req.body.description) { prodList[pos].description =  req.body.description};
    if ( req.body.price) { prodList[pos].price =  req.body.price};
    if ( req.body.Weight) { prodList[pos].Weight =  req.body.Weight };
    //console.log( prodList);
    res.status(200).json(  prodList[pos]);
    next();
  };
  
  const deleteProductById = (req, res, next) => {
    //console.log("in func");
    let pos =  prodList.indexOf(   prodList.find((el) => el.id == req.params.prodId) );
  
    let removedItem = prodList.splice(pos, 1) 
    //res.status(200).json( prodList );
    res.status(200).json( removedItem );
    next();
  };
  
  
  // respond with "hello world" when a GET request is made to the homepage
  app.get("/", function (req, res) {
    res.send("hello world");
  });
  
  // respond with results calling getAllCategories
    app.get("/categories", getAllCategories, (req, res) => {
    //do nothing, let the function handle it
  });
  
  // respond with results calling getProductsByCatId
  app.get("/categories/:catId/products/", getProductsByCatId, (req, res) => {
    //do nothing, let the function handle it
    console.log("req.params.catId: ", req.params.catId);
  });
  
  // respond with results calling getProductsById
  app.get("/products/:prodId", getProductsById, (req, res) => {
    //do nothing, let the function handle it
    console.log("req.params.catId: ", req.params.prodId);
  });
  
  // respond with results calling createProductById
  app.post("/categories/:catId/products/", jsonParser, createProductById, (req, res) => {
    //do nothing, let the function handle it
    //console.log("req.params.catId: ", req.params.catId);
    //console.log("req.body: ", req.body);
  });
  
  // respond with results calling updateProductsById
  app.put("/products/:prodId", jsonParser, updateProductById, (req, res) => {
    //do nothing, let the function handle it
  });
  
  // respond with results calling deleteProductsById
  app.delete("/products/:prodId", jsonParser, deleteProductById, (req, res) => {
    //do nothing, let the function handle it
  });
  
  app.listen(3000, () => {
    console.log("Express intro running on localhost:3000");
  });
  