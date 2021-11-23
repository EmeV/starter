
  
   const express = require("express");
   const bodyParser = require('body-parser')
   const router = express.Router()
   const jsonParser = bodyParser.json();

   const data = require('../data/memory');
   const prodList = data.prodList;  // constant
   //const getProdListbyId = data.prodList;   //function
    
  
  
  //Reading all products in a given category (by id),
  const getProductsById = (req, res, next) => {
    //console.log("in func");

    res.status(200).json(prodList.find((el) => el.id == req.params.prodId));
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
  
  
  
  // respond with results calling getProductsById
  router.get("/:prodId", getProductsById, () => {
    //do nothing, let the function handle it
    //console.log("req.params.catId: ", req.params.prodId);
  });
  
  // respond with results calling updateProductsById
  router.put("/:prodId", jsonParser, updateProductById, (req, res) => {
    //do nothing, let the function handle it
  });
  
  // respond with results calling deleteProductsById
  router.delete("/:prodId", jsonParser, deleteProductById, (req, res) => {
    //do nothing, let the function handle it
  });
  
  
  module.exports = router;