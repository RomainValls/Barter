const express = require("express");
const router = express.Router();
const CurrentMission = require("./../models/CurrentMission.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const currentMission = await CurrentMission.find()
      .populate("request")
      .sort({ createdAt: -1 });
    res.status(200).json(currentMission);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneCurrentMission = await CurrentMission.findById(id).populate(
      "request"
    );
    res.status(200).json(oneCurrentMission);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { request, validation } = req.body;
    const createdCurrentMission = await CurrentMission.create({
      request,
      validation,
    });
    res.status(201).json(createdCurrentMission);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { request, validation } = req.body;
  try {
    const sameId = await CurrentMission.findById(id);
    if (!sameId) {
      return res.status(404).json({ message: `Id : ${id} doesn't exist` });
    }
    const updatedCurrentMission = await CurrentMission.findByIdAndUpdate(
      id,
      { request, validation },
      { new: true }
    );
    res.status(200).json(updatedCurrentMission);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCurrentMission = await CurrentMission.findByIdAndDelete(id);
    res.json({ message: "current mission deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
