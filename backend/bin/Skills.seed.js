require("dotenv/config");
require("../db/index");
const Skills = require("../models/Skills.model");

const skills = { name: "hammering" };

async function seed() {
  try {
    await Skills.deleteMany();
    await Skills.create(skills);
    console.log("Created all the skills!");
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

seed();
