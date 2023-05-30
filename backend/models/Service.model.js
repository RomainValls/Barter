const { model, Schema } = require("mongoose");

const serviceSchema = new Schema({
  name: { type: String, required: true },
  provider: { type: Schema.Types.ObjectId, ref: "User", required: true },
  skill: { type: Schema.Types.ObjectId, ref: "Skills", required: true },
  image: { type: String, default: "../../frontend/public/Images/customer.png" },
});

const Service = model("Service", serviceSchema);

module.exports = Service;
