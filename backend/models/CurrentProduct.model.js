const { Schema, model } = require("mongoose");

const currentProductSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    validation: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const CurrentProduct = model("CurrentProduct", currentProductSchema);
module.exports = CurrentProduct;
