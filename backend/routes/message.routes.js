const express = require("express");
const router = express.Router();
const Message = require("./../models/Message.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allMessages = await Message.find().populate("sender receiver");
    res.json(allMessages);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneMessage = await Message.find({ requestId: id }).populate("sender");
    res.status(200).json(oneMessage);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { content, receiver, requestId } = req.body;
    const createdMessage = await Message.create({
      content,
      sender: req.payload._id,
      receiver,
      requestId,
    });
    res.status(201).json(createdMessage);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { content, sender } = req.body;
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { content, sender },
      { new: true }
    );
    res.status(200).json(updatedMessage);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedMessage = await Message.findByIdAndDelete(id);
    res.json({ message: "message deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
