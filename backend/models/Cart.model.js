const { Schema, model } = require("mongoose");

const cartSchema = {
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
};

const Cart = model("Cart", cartSchema);
module.exports = Cart;
