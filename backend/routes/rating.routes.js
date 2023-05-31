const express = require("express");
const router = express.Router();
const Rating = require("./../models/Rating.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allRatings = await Rating.find();
    res.json(allRatings);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneRating = await Rating.findById(id);
    res.status(200).json(oneRating);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { requester, provider, rating } = req.body;
    const createdRating = await Rating.create({
      requester,
      provider,
      rating,
    });
    res.status(201).json(createdRating);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { requester, provider, rating } = req.body;
  try {
    const updatedRating = await Rating.findByIdAndUpdate(
      id,
      { requester, provider, rating },
      { new: true }
    );
    res.status(200).json(updatedRating);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRating = await Rating.findByIdAndDelete(id);
    res.json({ message: "rating deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
