const categoryData = require("../data/memory/productCategoryList");
const productData = require("../data/memory/prodList");
const CategoryModel = require("../data/models/category").model;
const ProductModel = require("../data/models/product").model;

const getAllCategories = async (req, res, next) => {
  //categoryData.productCategoryList().then( (catList) => res.status(200).json(catList)); //constants
  try {
    const allCat = await CategoryModel.find();
    //console.log(allCat);
    res.status(201).json(allCat);
  } catch (err) {
    res.status(400).json({ message: err });
  }
  next();
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await CategoryModel.findById(req.params.catId);
    console.log(category);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err });
  }
  next();
};

//Reading all products in a given category (by id),
const getProductsByCatId = async (req, res, next) => {
  //productData.getProductsByCatId(req.params.catId).then( (prod) => res.status(200).json( prod ) ).catch( () => res.status(404).end() );
  try {
    const category = await CategoryModel.findById(req.params.catId);
    if (category !== null) {
      const allProdsOfCat = await ProductModel.find({
        "category.name": category.name,
      });
      res.status(200).json(allProdsOfCat);
    } else {
      res.status(400).json({
        message: "Category with ID: " + req.params.catId + " not found!",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
  next();
};

const createNewCategory = async (req, res, next) => {
  try {
    //await productValidation(req.body);
    const cat = new CategoryModel(req.body);
    //console.log(cat);
    const savedCat = await cat.save();
    //console.log(savedCat);
    res.status(201).json(savedCat);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createProductById = async (req, res, next) => {
  try {
    const category = await CategoryModel.findById(req.params.catId);
    if (category !== null) {
      const allProdsOfCat = await ProductModel.find({
        "category.name": category.name,
      });
      const tempProd = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        weight: req.body.weight,
        category: {
          name: category.name,
          description: category.description,
        }
      };
      const prod = new ProductModel(tempProd);

      const savedProd = await prod.save();
      console.log("saved");
      console.log(savedProd);
      res.status(201).json(savedProd);
    } else {
      res.status(400).json({
        message: "Category with ID: " + req.params.categoryId + " not found!",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
  next();
};

module.exports = {
  getAllCategories,
  getProductsByCatId,
  createNewCategory,
  getCategoryById,
  createProductById,
};
