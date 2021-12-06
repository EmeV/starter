const data = require("../data/memory");
const productData = require("../data/memory/prodList");
const ProductModel = require("../data/models/product").model;
//const prodList = data.prodList; // constant
//const getProdListbyId = data.prodList;   //function

const categoryController = require("../controllers/categoryController");

//Reading all products in a given category (by id),
const getProductsById = async (req, res, next) => {
  //console.log("in func");
  //productData.getProductsById(req.params.prodId).then( (prod) => res.status(200).json( prod ) ).catch( () => res.status(404).end() );
  //next();

  try {
    const prod = await ProductModel.findById(req.params.prodId);
    if (prod !== null) {
      res.status(200).json(prod);
    } else {
      res.status(400).json({
        message: "Category with ID: " + req.params.prodId + " not found!",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const updateProductById = async (req, res, next) => {
  //let prod = prodList.find( (el) => el.id == req.params.prodId); //this is not a copy of the prod, but a reference
  try {
    // const productData = {
    //   name: req.body.name,
    //   description: req.body.description,
    //   price: req.body.price,
    //   weight: req.body.weight,
    //   category: req.body.category,
    // };
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: req.params.prodId },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          weight: req.body.weight,
          category: req.body.category,
        },
      },
      { new: true }
    );
    if (updatedProduct !== null) {
      res.status(200).json(updatedProduct);
    } else {
      res
        .status(400)
        .json({
          message: "Product with ID: " + req.params.prodId + " not found.",
        });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
  next();
};

const createProduct = async (req, res, next) => {
  //console.log("in func");
  try {
    //console.log(req.body);
    //await productValidation(req.body);
    const prod = new ProductModel(req.body);
    //console.log(cat);
    const savedProd = await prod.save();
    //console.log(savedCat);
    res.status(201).json(savedProd);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const deleteProductById = async (req, res, next) => {
  //console.log("in func");

  productData
    .deleteProductById(req.params.prodId)
    .then((prod) => {
      res.status(200).json(prod);
    })
    .catch(() => res.status(404).end());

  next();
};

module.exports = {
  getProductsById,
  updateProductById,
  deleteProductById,
  createProduct,
};
