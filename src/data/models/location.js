const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    name: String,
    required: true,
    unique: true,
  },
  Country: String,
  City: String,  
  County: String,
  StreetAddress: String
});

module.exports = { model: mongoose.model("Location", locationSchema)};