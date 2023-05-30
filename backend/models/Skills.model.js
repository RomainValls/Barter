const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  name: String,
  required: true,
});

const Skills = model("Skills", skillsSchema);
module.exports = Skills;
