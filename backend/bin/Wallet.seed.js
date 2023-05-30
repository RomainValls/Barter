require("dotenv/config");
require("../db/index");
const Wallet = require("../models/Wallet.model");

const wallet = {
  barterBucks: 800,
  user: "6475ee916536be87920540a5",
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
