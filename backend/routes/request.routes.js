const express = require("express");
const router = express.Router();
const Request = require("../models/Request.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allRequest = await Request.find();
    res.json(allRequest);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneRequest = await Request.findById(id);
    res.json(oneRequest);
  } catch (error) {
    next(error);
  }
});

router.get("/me", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  try {
    const allMyRequests = await Request.find({
      $or: [{ requester: _id }, { provider: _id }],
    });
    res.json(allMyRequests);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { name, provider, bbAmount, firstMessage, acceptButton } = req.body;
    const createdRequest = await Request.create({
      name,
      provider,
      requester: req.payload._id,
      bbAmount,
      firstMessage,
      acceptButton,
    });
    console.log("this is the created Skill", createdRequest);
    res.json(createdRequest);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { name, provider, requester, bbAmount, firstMessage, acceptButton } =
    req.body;
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      {
        name,
        provider,
        requester,
        bbAmount,
        firstMessage,
        acceptButton,
      },
      { new: true }
    );
    res.json(updatedRequest);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRequest = await Request.findByIdAndDelete(id);
    res.json(deletedRequest);
  } catch (error) {}
});

module.exports = router;
