const express = require("express");
const router = express.Router();
const Wallet = require("../models/Wallet.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const userWallet = await Wallet.findOne({ user: req.payload._id });
    res.json(userWallet);
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const oneWallet = await Wallet.findById(id);
//     res.json(oneWallet);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { barterBucks, user } = req.body;
//     const createdWallet = await Wallet.create({ barterBucks, user });
//     console.log("this is the created Wallet", createdWallet);
//     res.json(createdWallet);
//   } catch (error) {
//     next(error);
//   }
// });

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { barterBucks } = req.body;
  try {
    const wallet = await Wallet.findOne({ user: id });
    wallet.barterBucks += barterBucks;
    await wallet.save();
    // const updatedWallet = await Wallet.findByIdAndUpdate(
    //   id,
    //   {
    //     barterBucks,
    //     user,
    //   },
    //   { new: true }
    // );
    res.json(wallet);
  } catch (error) {
    next(error);
  }
});

// router.delete("/:id", isAuthenticated, async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const deletedWallet = await Wallet.findByIdAndDelete(id);
//     res.json(deletedWallet);
//   } catch (error) {}
// });

module.exports = router;
