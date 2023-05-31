const express = require("express");
const router = express.Router();
const User = require("./../models/User.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneUser = await User.findById(id);
    res.json(oneUser);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const {
    email,
    password,
    name,
    phone,
    location,
    picture,
    skills,
    availability,
    rating,
    wallet,
  } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      email,
      password,
      name,
      phone,
      location,
      picture,
      skills,
      availability,
      rating,
      wallet
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {}
});

module.exports = router;
