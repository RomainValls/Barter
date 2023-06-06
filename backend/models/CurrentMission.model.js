const { Schema, model } = require("mongoose");

const currentMissionSchema = new Schema(
  {
    request: { type: Schema.Types.ObjectId, ref: "Request", required: true },
    validation: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const CurrentMission = model("CurrentMission", currentMissionSchema);
module.exports = CurrentMission;
