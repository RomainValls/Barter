const express = require("express");
const router = express.Router();
const Skills = require("../models/Skills.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allSkills = await Skills.find();
    res.json(allSkills);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneSkill = await Skills.findById(id);
    res.json(oneSkill);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { name } = req.body;
    const createdSkill = await Skills.create({ name });
    console.log("this is the created Skill", createdSkill);
    res.json(createdSkill);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedSkill = await Skills.findByIdAndUpdate(
      id,
      {
        name,
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
    const deletedSkill = await Skills.findByIdAndDelete(id);
    res.json(deletedSkill);
  } catch (error) {}
});

module.exports = router;
