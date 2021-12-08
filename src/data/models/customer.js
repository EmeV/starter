const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  Email: String
});

module.exports = { model: mongoose.model("Customer", customerSchema)};