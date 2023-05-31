const express = require("express");
const router = express.Router();
const Service = require("../models/Service.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allService = await Service.find();
    res.json(allService);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneSkill = await Service.findById(id);
    res.json(oneSkill);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { name, provider, skill, image } = req.body;
    const createdSkill = await Service.create({ name, provider, skill, image });
    console.log("this is the created Skill", createdSkill);
    res.json(createdSkill);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { name, provider, skill, image } = req.body;
  try {
    const updatedSkill = await Service.findByIdAndUpdate(
      id,
      {
        name,
        provider,
        skill,
        image,
      },
      { new: true }
    );
    res.json(updatedSkill);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedSkill = await Service.findByIdAndDelete(id);
    res.json(deletedSkill);
  } catch (error) {}
});

module.exports = router;
