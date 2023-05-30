const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Category = model("Category", categorySchema);
module.exports = Category;
