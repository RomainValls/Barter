const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  required: true,
});

const Category = model("Category", categorySchema);
module.exports = Category;
