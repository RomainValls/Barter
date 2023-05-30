require("mongoose");
require("dotenv/config");
require("../db/index");
const User = require("../models/User.model");
const users = [
  {
    email: "Bob",
    password: "bob@mail.com",
    name: "fcezezfv",
    phone: "0615121314",
    location: "10 rue du truc",
    skills: "6475df0958cd636fa3d1ff5c",
  },
  {
    email: "John",
    password: "john@mail.com",
    name: "fcezezfv",
    phone: "0615121315",
    location: "10 rue du truc",
    skills: "6475df0958cd636fa3d1ff5c",
  },
  {
    email: "Alice",
    password: "alice@mail.com",
    name: "fcezezfv",
    phone: "0615121316",
    location: "10 rue du truc",
    skills: "6475df0958cd636fa3d1ff5c",
  },
];

async function seed() {
  try {
    await User.deleteMany();
    await User.create(users);
    console.log("Created all the users!");
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

seed();
