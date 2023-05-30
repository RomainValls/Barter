require("dotenv/config");
require("../db/index");
const Message = require("../models/Message.model");

const message = {
  content: "Wesh ça va ou quoi, je suis un message mon gars !!",
};

async function seed() {
  try {
    await Message.deleteMany();
    await Message.create(message);
    console.log("Created all the Message!");
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

seed();
