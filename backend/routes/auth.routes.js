const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcryptjs");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Wallet = require("./../models/Wallet.model");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const isAuthenticated = require("../middleware/isAuthenticated");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", async (req, res, next) => {
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

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    }

    if (email === "" || password === "" || name === "" || phone === "") {
      res
        .status(400)
        .json({ message: "Please, provide email, password, name and phone." });
      return;
    }

    // Check if email or password or name are provided as empty strings

    // This regular expression check that the email is of a valid format
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    // if (!emailRegex.test(email)) {
    //   res.status(400).json({ message: "Provide a valid email address." });
    //   return;
    // }

    // This regular expression checks password for special characters and minimum length
    // const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    // if (!passwordRegex.test(password)) {
    //   res.status(400).json({
    //     message:
    //       "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    //   });
    //   return;
    // }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      name,
      phone,
      location,
      picture,
      skills,
      availability,
      rating,
      wallet,
    });
    await Wallet.create({ user: createdUser._id });

    res.status(201).json({ user: createdUser });
  } catch (error) {
    next(error);
  }
});

// POST  /auth/login - Verifies email and password and returns a JWT

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      res.status(400).json({ message: "Provide email and password." });
      return;
    }
    const foundUser = await User.findOne({ email }).select("password email");
    if (!foundUser) {
      return res.status(400).json({ message: "Wrong email or password" });
    }
    const samePassword = await bcrypt.compare(password, foundUser.password);
    if (!samePassword) {
      return res.status(400).json({ message: "Wrong email or password" });
    }
    const payload = { name: foundUser.name, _id: foundUser._id };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "30d",
    });
    res.json({ token: token });
  } catch (error) {
    next(error);
  }
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

module.exports = router;
