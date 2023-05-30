const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  barterBucks: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Skills = model("Wallet", walletSchema);
module.exports = Wallet;
