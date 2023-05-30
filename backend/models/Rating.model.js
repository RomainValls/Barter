const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
});

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
