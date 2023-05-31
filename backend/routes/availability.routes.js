const express = require("express");
const router = express.Router();
const Availability = require("./../models/Availability.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allAvailabilities = await Availability.find();
    res.json(allAvailabilities);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneAvaibility = await Availability.findById(id);
    res.status(200).json(oneAvaibility);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { available, hoursOfDay } = req.body;
    const createdAvailability = await Availability.create({
      available,
      hoursOfDay,
    });
    res.status(201).json(createdAvailability);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { available, hoursOfDay } = req.body;
  try {
    const sameId = await Availability.findById(id);
    if (!sameId) {
      return res.status(404).json({ message: `Id : ${id} doesn't exist` });
    }
    const updatedAvailability = await Availability.findByIdAndUpdate(
      id,
      { available, hoursOfDay },
      { new: true }
    );
    res.status(200).json(updatedAvailability);
  } catch (error) {
    console.log(error.status.message);
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedAvailability = await Availability.findByIdAndDelete(id);
    res.json({ message: "availability deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
