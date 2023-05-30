const express = require("express");
const router = express.Router();
const User = require("./../models/User.model");

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
    const oneUser = await User.findById(id);
    res.json(oneUser);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log("test:", req.body);

  try {
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

    const createdUser = await User.create({
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
    });

    console.log("this is the created user", createdUser);
    res.json(createdUser);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
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

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {}
});

module.exports = router;
