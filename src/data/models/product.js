const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
      },
      description: String,
      price: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      category: {
        name: {
          type: String,
          required: true,
        },
        description: String,
      }
})

module.exports = { model: mongoose.model("Product", productSchema)};