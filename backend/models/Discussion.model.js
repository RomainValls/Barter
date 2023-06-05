const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: [
      {
        type: String,
      },
    ],
    closeDiscussion: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const Discussion = mongoose.model("Discussion", discussionSchema);
module.exports = Discussion;
