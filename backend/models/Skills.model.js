const { Schema, model } = require("mongoose");

const skillsSchema = new Schema({
  name: { type: String, required: true },
  serviceCategory: { type: String, required: true },
});

const Skills = model("Skills", skillsSchema);
module.exports = Skills;
