const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippedFrom: {
    name: {
        name: String,
        required: true,
        unique: true,
      },
      Country: String,
      City: String,  
      County: String,
      StreetAddress: String
  },
  customer: {
    firstName: String,
    lastName: String,
    Email: String
  },
  createdAd : Date,  
  //County: String,
  //StreetAddress: String
});

module.exports = { model: mongoose.model("Order", orderSchema)};