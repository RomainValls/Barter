const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default:
        "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-150x150.jpg",
    },
    skills: { type: Schema.Types.ObjectId, ref: "Skills", required: true },
    availability: { type: Schema.Types.ObjectId, ref: "Availability" },
    rating: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
