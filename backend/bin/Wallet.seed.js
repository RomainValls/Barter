require("dotenv/config");
require("../db/index");
const Wallet = require("../models/Wallet.model");

const wallet = {
  barterBucks: 800,
  user: "64789981dc1754a3ac3c10a3",
};

async function seed() {
  try {
    await Wallet.deleteMany();
    await Wallet.create(wallet);
    console.log("Created the wallet!");
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

seed();
