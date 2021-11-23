
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

  const p = new Promise( (resolve, reject) => { resolve( prodList ) });

  async function getProducts() {
    return p; //.then( () => productCategoryList).catch( () => console.log("error in promise categories"));
  };


//module.exports = getProducts;

module.exports = prodList;