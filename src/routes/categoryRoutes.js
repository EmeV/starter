const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const jsonParser = bodyParser.json();

const categoryController = require("../controllers/categoryController");

// const getAllCategories = (request, res, next) => {
//   console.log("in func");
//   productCategoryList().then( (catList) => res.status(200).json(catList));
//   next();
// };

// //Reading all products in a given category (by id),
// const getProductsByCatId = (req, res, next) => {
//   let result = [];

//   for (var i = 0; i < prodList.length; i++) {
//    console.log("cat Id of prod: "+ prodList[i].category.id );
//     if (prodList[i].category.id == req.params.catId) {
//       result.push(prodList[i]);
//     }
//   }
//   res.status(200).json(result);
//   next();
// };

function createNewProdId() {
  let newId = 0;
  for (var i = 0; i < prodList.length; i++) {
    if (newId < prodList[i].id) {
      newId = prodList[i].id;
    }
  }
  return newId + 1;
}

const createProductById = (req, res, next) => {
  //console.log("in func");
  // create new id
  let newId = createNewProdId();
  let pos = productCategoryList.indexOf(
    productCategoryList.find((el) => el.id == req.params.catId)
  );

  prodList.push({
    id: newId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    Weight: req.body.Weight,
    category: productCategoryList[pos],
  });

  //console.log( prodList);
  //res.statusMessage = "create success";
  //res.status(201).json( prodList);
  res.status(201).end();
  next();
};

// respond with results calling getAllCategories
router.get("/", categoryController.getAllCategories, async (req, res) => {
  //do nothing, let the function handle it
  //console.log( "get all categories");
});

// respond with results calling getProductsByCatId
router.get("/:catId/products/", categoryController.getProductsByCatId, (req, res) => {
  //do nothing, let the function handle it
  console.log("req.params.catId: ", req.params.catId);
});

// respond with results calling createProductById
router.post("/:catId/products/", jsonParser, categoryController.createProductById, (req, res) => {
  //do nothing, let the function handle it
  //console.log("req.params.catId: ", req.params.catId);
  //console.log("req.body: ", req.body);
});

router.post("/", jsonParser, categoryController.createNewCategory, async (req, res) => {
  //do nothing, let the function handle it
  //console.log("req.body: ", req.body);
});

module.exports = router;
