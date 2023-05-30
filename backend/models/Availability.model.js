const { Schema, model } = require("mongoose");

const availabilitySchema = new Schema({
  available: { type: Boolean, default: false, required: true },
  hoursOfDay: {
    type: [
      {
        day: {
          type: Number,
          min: 0,
          max: 6,
        },
        hour: {
          type: Number,
          min: 0,
          max: 23,
        },
      },
    ],
    required: true,
  },
});

const Availability = model("Availability", availabilitySchema);

module.exports = Availability;
