const mongoose = require("mongoose");

const commentarySchema = new mongoose.Schema(
  {
    commented: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Commentary = mongoose.model("Commentary", commentarySchema);
module.exports = Commentary;
