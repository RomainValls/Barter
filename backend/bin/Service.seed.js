require("dotenv/config");
require("../db/index");
const Service = require("../models/Service.model");

const service = {
  name: "Garder de chien",
  provider: "6475ee5278a6598ce89850ae",
  skill: "6475ee5f148f4a4347980304",
};

async function seed() {
  try {
    await Service.deleteMany();
    await Service.create(service);
    console.log("Created all the services!");
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

seed();
