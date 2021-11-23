const productCategoryList = [
    { id: 1, name: "Chocolate", description: "sweet" },
    { id: 2, name: "Bread", description: "bakery stuff" },
    { id: 3, name: "Milk", description: "Dairy" },
  ];


  const p = new Promise( (resolve, reject) => { resolve() });

  async function getCategories() {
    return p.then( () => productCategoryList).catch( () => console.log("error in promise categories"));
  };

//module.exports =  productCategoryList;
module.exports = getCategories;