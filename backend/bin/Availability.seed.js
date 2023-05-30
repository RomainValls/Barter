require("dotenv/config");
require("../db/index");
const Availability = require("../models/Availability.model");

const availability = {
  available: true,
  hoursOfDay: [
    { day: 0, hour: 15 },
    { day: 3, hour: 19 },
  ],
};

async function seed() {
  try {
    await Availability.deleteMany();
    await Availability.create(availability);
    console.log("Created the availability!");
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

seed();
