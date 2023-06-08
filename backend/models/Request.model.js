const { model, Schema } = require("mongoose");
const Message = require("./../models/Message.model");

const requestSchema = new Schema(
  {
    name: { type: String, required: true },
    provider: { type: Schema.Types.ObjectId, ref: "User", required: true },
    requester: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bbAmount: { type: Number, required: true },
    category: { type: String, required: true },
    firstMessage: { type: String },
    acceptButton: { type: Boolean, default: false },

    messages: { type: String },
  },
  { timestamps: true }
);

const Request = model("Request", requestSchema);

module.exports = Request;
