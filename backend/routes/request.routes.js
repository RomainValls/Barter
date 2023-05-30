const express = require("express");
const router = express.Router();
const Request = require("../models/Request.model");

router.get("/", async (req, res, next) => {
  try {
    const allRequest = await Request.find();
    res.json(allRequest);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneRequest = await Request.findById(id);
    res.json(oneRequest);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, provider, requester, bbAmount, firstMessage, acceptButton } =
      req.body;
    const createdRequest = await Request.create({
      name,
      provider,
      requester,
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

router.patch("/:id", async (req, res, next) => {
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

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRequest = await Request.findByIdAndDelete(id);
    res.json(deletedRequest);
  } catch (error) {}
});

module.exports = router;
