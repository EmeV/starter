
const productCategoryList = require('./productCategoryList');

const prodList = [
    {
      id: 1,
      name: "Milka",
      description: "Milk chocolate",
      price: 10,
      Weight: 100,
      category: productCategoryList[0],
    },
    {
      id: 2,
      name: "Poiana",
      description: "Milk chocolate",
      price: 8,
      Weight: 100,
      category: productCategoryList[0],
    },
    {
      id: 3,
      name: "LaDorna",
      description: "Milk 1,5% ",
      price: 5,
      Weight: 1,
      category:productCategoryList[2],
    },
    {
      id: 4,
      name: "Cibatta",
      description: "Cibatta",
      price: 10,
      Weight: 500,
      category: productCategoryList[1],
    },
  ];

  

  async function getProductsById( id ) {  
    
    const p = new Promise(  (resolve, reject) => { 
      let product = prodList.find((el) => el.id == id)   
        if ( product) {
          resolve(product);
        } else{
          reject("Product with id " + id + " not found");
        }  });
    return p; 
  };

  async function getProductsByCatId( id ) {  
    
    const p = new Promise(  (resolve, reject) => { 
    let result = [];
  
    for (var i = 0; i < prodList.length; i++) {
     console.log("cat Id of prod: "+ prodList[i].category.id );
      if (prodList[i].category.id == req.params.catId) {
        result.push(prodList[i])
      } 
      if ( result.length > 0) {
        resolve(result);
      }else{
          reject("Product with id " + id + " not found");
        } 
    } });
    return p; 
  };

  
  async function getProductPosById(id) {  
    const p = new Promise(  (resolve, reject) => { 
      let pos = prodList.indexOf(prodList.find((el) => el.id == id))    
        if ( pos) {
          resolve(pos);
        } else{
          reject("Product with id " + id + " not found");
        }  });
    return p; 
  };

  async function deleteProductById(id) {  
    const p = new Promise(  (resolve, reject) => { 
      let pos = prodList.indexOf(prodList.find((el) => el.id == id))    
        if ( pos) {
          let removedItem = prodList.splice(pos, 1);
          if (removedItem){
         // resolve(removedItem);
          resolve(prodList);
          }
          else{
            reject("Product with id " + id + " not found");
          } 
        } else{
          reject("Product with id " + id + " not found");
        }  });
    return p; 
  };

module.exports = { getProductPosById, getProductsById, deleteProductById, getProductsByCatId };

//module.exports = prodList;