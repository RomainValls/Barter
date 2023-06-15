const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;

  try {
    const myCart = await Cart.findOne({
      user: _id,
    }).populate("products");
    res.json(myCart);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { products } = req.body;
    const createdCart = await Cart.create({
      user: req.payload._id,
      products,
    });
    res.json(createdCart);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { products } = req.body;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      {
        products,
      },
      { new: true }
    );
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCart = await Cart.findByIdAndDelete(id);
    res.json(deletedCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
