require("dotenv/config");
require("../db/index");
const Rating = require("../models/Rating.model");

const rating = {
  requester: "6475ee916536be87920540a5",
  provider: "6475ee916536be87920540a6",
  rating: 4,
};

async function seed() {
  try {
    await Rating.deleteMany();
    await Rating.create(rating);
    console.log("Created the Rating!");
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

seed();
