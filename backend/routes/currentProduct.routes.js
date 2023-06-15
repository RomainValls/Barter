const express = require("express");
const router = express.Router();
const CurrentProduct = require("./../models/CurrentProduct.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const currentProduct = await CurrentProduct.find()
      .populate({
        path: "product",
        populate: [
          { path: "provider", select: "name" },
          { path: "requester", select: "name" },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json(currentProduct);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneCurrentProduct = await CurrentProduct.findById(id).populate({
      path: "product",
      populate: [
        { path: "provider", select: "name" },
        { path: "requester", select: "name" },
      ],
    });
    res.status(200).json(oneCurrentProduct);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { product, validation } = req.body;
    const createdCurrentProduct = await CurrentProduct.create({
      product,
      validation,
    });
    res.status(201).json(createdCurrentProduct);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { product, validation } = req.body;
  try {
    const sameId = await CurrentProduct.findById(id);
    if (!sameId) {
      return res.status(404).json({ message: `Id : ${id} doesn't exist` });
    }
    const updatedCurrentProduct = await CurrentProduct.findByIdAndUpdate(
      id,
      { product, validation },
      { new: true }
    );
    res.status(200).json(updatedCurrentProduct);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCurrentProduct = await CurrentProduct.findByIdAndDelete(id);
    res.json({ message: "current product deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
