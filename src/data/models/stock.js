const mongoose = require("mongoose");

let stockSchema = new mongoose.Schema({

    product: {
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
    },

    location: {
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
    quantity: int

})

module.exports = { model: mongoose.model("Stock", stockSchema)};