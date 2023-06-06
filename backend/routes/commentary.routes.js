const express = require("express");
const router = express.Router();
const Commentary = require("../models/Commentary.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allCommentaries = await Commentary.find()
      .populate("commentator")
      .sort({ createdAt: -1 });
    res.json(allCommentaries);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneCommentary = await Commentary.findById(id);
    res.status(200).json(oneCommentary);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { commented, commentary } = req.body;
    const createdCommentary = await Commentary.create({
      commentator: req.payload._id,
      commented,
      commentary,
    });
    res.status(201).json(createdCommentary);
  } catch (error) {
    console.log(error.status);
    next(error);
  }
});

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { commentary } = req.body;
  try {
    const updatedCommentary = await Commentary.findOneAndUpdate(
      { _id: id, commentator: req.payload._id },
      { commentator, commented, commentary },
      { new: true }
    );
    res.status(200).json(updatedCommentary);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCommentary = await Commentary.findOneAndDelete({
      _id: id,
    });
    res.json({ message: "commentary deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
