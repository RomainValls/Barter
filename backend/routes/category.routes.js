const express = require("express");
const router = express.Router();
const Category = require("./../models/Category.model");

router.get("/", async (req, res, next) => {
  try {
    const allCategories = await Category.find();
    res.json(allCategories);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneCategory = await Category.findById(id);
    res.status(200).json(oneCategory);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const createdCategory = await Availability.create({
      name,
    });
    res.status(201).json(createdCategory);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const sameId = await Category.findById(id);
    if (!sameId) {
      return res.status(404).json({ message: `Id : ${id} doesn't exist` });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json({ message: "category deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
