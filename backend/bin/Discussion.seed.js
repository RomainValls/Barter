require("dotenv/config");
require("../db/index");
const Discussion = require("../models/Discussion.model");

const discussion = {
  requester: "6475ee5278a6598ce89850ae",
  provider: "6475ee5278a6598ce89850af",
  message: "6475f04a41e2da3b542b1e29",
  closeDiscussion: "false",
};

async function seed() {
  try {
    await Discussion.deleteMany();
    await Discussion.create(discussion);
    console.log("Created all the discussions!");
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

seed();
