require("dotenv/config");
require("../db/index");
const Request = require("../models/Request.model");

const request = {
  name: "Garder de chien",
  provider: "6475ee5278a6598ce89850ae",
  requester: "6475ee5278a6598ce89850af",
  bbAmount: 10,
  firstMessage: "Viens garder mon chien",
  acceptButton: false,
};

async function seed() {
  try {
    await Request.deleteMany();
    await Request.create(request);
    console.log("Created all the requests!");
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

seed();
