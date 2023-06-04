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

router.delete("/", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  try {
    const deletedUser = await User.findByIdAndDelete(_id);
    res.json(deletedUser);
  } catch (error) {}
});

module.exports = router;
