const express = require("express");
const router = express.Router();
const User = require("./../models/User.model");
const Service = require("./../models/Service.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneUser = await User.findById(id).populate("skills");
    const userService = await Service.find({
      $or: [{ provider: id }, { requester: id }],
    });

    res.json({ oneUser, userService });
  } catch (error) {
    next(error);
  }
});

router.patch("/", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const { email, name, phone, location, picture, skills, availability } =
    req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, {
      email,
      name,
      phone,
      location,
      picture,
      skills,
      availability,
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.patch("/skills", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const { skillId } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(_id);

    // Add the skillId to the user's skills array
    user.skills.push(skillId);

    // Save the updated user
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.patch("/removeSkills", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const { skillId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { $pull: { skills: skillId } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete skill from user" });
  }
});

module.exports = router;
