const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const Message = model("Message", messageSchema);
module.exports = Message;
