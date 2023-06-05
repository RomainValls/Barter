const { model, Schema } = require("mongoose");

const requestSchema = new Schema({
  name: { type: String, required: true },
  provider: { type: Schema.Types.ObjectId, ref: "User", required: true },
  requester: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bbAmount: { type: Number, required: true },
  messages: { type: String },
  // acceptButton: { type: Boolean, required: true, default: false },
});

const Request = model("Request", requestSchema);

module.exports = Request;
