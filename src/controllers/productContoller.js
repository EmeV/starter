const ProductModel = require("../data/models/product").model;
const categoryController = require("../controllers/categoryController");
const open = require("fs/promises").open;
const fs = require("fs");

const filepathDir = "C:/Users/varadye/starter/tmp/";

//Reading all products in a given category (by id),
const getProductsById = async (req, res, next) => {
  console.log("in func  getProductsById ");
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
      res.status(400).json({
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
    //await productValidation(req.body);
    const prod = new ProductModel(req.body);
    const savedProd = await prod.save();
    res.status(201).json(savedProd);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const updatePicture = async (req, res, next) => {
  //console.log("in func");
  try {
    const product = await ProductModel.findById(req.params.prodId);
    if (product !== null) {
      //console.log("prod found");
      //build the path: Folder tmp + filename = ProductID
      const filePath = filepathDir + req.params.prodId + ".jpg";
     // console.log("filepath: " + filePath);

      //check if picture exists
      try {
        const fd = await open(filePath);
        if (fd) {
          const updatedProduct = await ProductModel.findOneAndUpdate(
            { _id: product._id },
            { imageUrl: filePath }
          );
          //console.log(updatedProduct);
          res.status(201).json(updatedProduct);
        } else {
          res.status(400).json({
            message: "Picture not found.",
          });
        }
      } catch (err) {
        res.status(400).json({ message: err });
      }
    } else {
      res.status(404).json({
        message: "Product with ID: " + req.params.prodId + " not found.",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const removePicture = async (req, res, next) => {
  //console.log("in func");
  try {
    const product = await ProductModel.findById(req.params.prodId);
    if (product !== null) {
      try {
        //remove picture from file system
        console.log(product.imageUrl);
        fs.unlink(product.imageUrl, (err) => {
          if (err) throw err;
          console.log('path/file.txt was deleted');
        });      
        //remove path from object
        const updatedProduct = await ProductModel.findOneAndUpdate(
          { _id: product._id },
          { imageUrl: "" }
        );
        res.status(201).json(updatedProduct);
      } catch (err) {
        res.status(400).json({ message: err });
      }
    } else {
      res.status(404).json({
        message: "Product with ID: " + req.params.prodId + " not found.",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const returnPicture = async (req, res, next) => {
  console.log("in func returnPicture");
  try {
    const product = await ProductModel.findById(req.params.prodId);
    if (product !== null) {
      //check if path exists
      if (product.imageUrl !== "") {
        const fd = await open(product.imageUrl);        
        if (fd) {
          // Create a stream from some character device.
          const stream = fs.createReadStream(product.imageUrl);
          stream.on("open", function () { 
            stream.pipe(res);
            fd.close();
          })
          stream.on("error", function () {
             res.end(err);})
        } else {
          res.status(400).message("file could not be opened");
        }
      } else {
        res.status(400).message("no picture provided");
      }
    } else {
      res.status(404).json({
        message: "Product with ID: " + req.params.prodId + " not found.",
      });
    }
  } catch (err) {
    console.log("here error big");
    res.status(400).json({ message: err });
  }
};

const returnProductswithPicture = async (req, res, next) => {
  
}  

const deleteProductById = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (product !== null) {
      const deletedProduct = await ProductModel.findOneAndRemove({
        _id: product._id,
      });
      res.status(201).json(deletedProduct);
    } else {
      res.status(404).json({
        message: "Product with ID: " + req.params.prodId + " not found.",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
  next();
};

module.exports = {
  getProductsById,
  updateProductById,
  deleteProductById,
  createProduct,
  updatePicture,
  removePicture,
  returnPicture,
};
