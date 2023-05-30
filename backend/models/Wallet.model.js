const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  barterBucks: {
    type: Number,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;
