const { Schema, model } = require("mongoose");

const skillsSchema = new Schema({
  name: {
    type: String,
    required: true,
    serviceCategory: {
      type: String,
      required: true,
      enum: [
        "Personal",
        "Professional",
        "Health and Wellness",
        "Educational",
        "Creative",
        "Home",
        "Transportation",
      ],
    },
  },
});

const Skills = model("Skills", skillsSchema);
module.exports = Skills;
