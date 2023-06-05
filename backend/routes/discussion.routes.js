const express = require("express");
const router = express.Router();
const Discussion = require("./../models/Discussion.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const discussions = await Discussion.find({
      $or: [{ requester: userId }, { provider: userId }],
    })
      .populate("message requester provider")
      .sort({ createdAt: -1 });
    res.status(200).json(discussions);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const userId = req.payload._id;
  try {
    const oneDiscussion = await Discussion.findOne({
      _id: id,
      $or: [{ requester: userId }, { provider: userId }],
    })
      .populate("message")
      .sort({ createdAt: -1 });
    res.status(200).json(oneDiscussion);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { requester, provider, message, closeDiscussion } = req.body;
    const createdDiscussion = await Discussion.create({
      requester,
      provider,
      message,
      closeDiscussion,
    });
    res.status(201).json(createdDiscussion);
  } catch (error) {
    console.log(error.status);
    next(error);
  }
});

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { requester, provider, message, closeDiscussion } = req.body;
  try {
    const sameId = await Discussion.findById(id);
    if (!sameId) {
      return res.status(404).json({ message: `Id : ${id} doesn't exist` });
    }
    const updatedDiscussion = await Discussion.findByIdAndUpdate(
      id,
      { requester, provider, message, closeDiscussion },
      { new: true }
    );
    res.status(200).json(updatedDiscussion);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedAvailability = await Discussion.findByIdAndDelete(id);
    res.json({ message: "availability deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
