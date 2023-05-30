const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  provider: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bbAmount: { type: Number, required: true },
  addToCart: { type: Boolean, required: true },
});

const Product = model("Product", productSchema);

module.exports = Product;
