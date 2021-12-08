const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const productController = require("../controllers/productContoller");

// respond with results calling getProductsById
router.get("/:prodId", productController.getProductsById); // nice way, but don'T put next() into the function

//return picutre as a stream
router.get("/:prodId/image", productController.returnPicture); // nice way, but don'T put next() into the function

//get all products with pictures 
router.get("/images", productController.returnProductswithPicture); // nice way, but don'T put next() into the function

// respond with results calling getProductsById
router.post("/", jsonParser, productController.createProduct);

//upload picture from fileSystem to product
router.post("/:prodId/image", jsonParser, productController.updatePicture);

// respond with results calling updateProductsById
router.put("/:prodId", jsonParser, productController.updateProductById, () => {
  //see, we don't need parameters
  //do nothing, let the function handle it
});

//remove picture of product
router.delete("/:prodId/image", jsonParser, productController.removePicture);

// respond with results calling deleteProductsById
router.delete(
  "/:prodId",
  jsonParser,
  productController.deleteProductById,
  (req, res) => {
    //the way from the training
    //do nothing, let the function handle it
  }
);

module.exports = router;
