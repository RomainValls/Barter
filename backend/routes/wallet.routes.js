const express = require("express");
const router = express.Router();
const Wallet = require("../models/Wallet.model");

router.get("/", async (req, res, next) => {
  try {
    const allWallets = await Wallet.find();
    res.json(allWallets);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneWallet = await Wallet.findById(id);
    res.json(oneWallet);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { barterBucks, user } = req.body;
    const createdWallet = await Wallet.create({ barterBucks, user });
    console.log("this is the created Wallet", createdWallet);
    res.json(createdWallet);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { barterBucks, user } = req.body;
  try {
    const updatedWallet = await Wallet.findByIdAndUpdate(
      id,
      {
        barterBucks,
        user,
      },
      { new: true }
    );
    res.json(updatedWallet);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedWallet = await Wallet.findByIdAndDelete(id);
    res.json(deletedWallet);
  } catch (error) {}
});

module.exports = router;
