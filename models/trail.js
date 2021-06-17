const mongoose = require("mongoose");
const TrailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficultly: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
      default: "Difficultly",
    },
    location: {
      type: String,
      required: true,
      default: "location",
    },
    length: {
      type: Date,
      required: true,
    },
    routeType: {
      type: String,
      required: true,
      enum: ["Out & Back", "Loop", "Point to Point"],
      default: "Route Type",
    },
    suitability: {
      type: String,
      required: true,
      enum: [
        "Dog Friendly",
        "Kid Friendly",
        "Stroller Friendly",
        "Wheelchair Friendly",
        "Paved",
        "Partially Paved",
      ],
      default: "suitability",
    },
    attractions: {
      type: String,
      required: true,
      enum: [
        "Waterfall",
        "Views",
        "Flowers",
        "Lake",
        "River",
        "Forest",
        "Wildlife",
        "Beach",
        "Cave",
        "Hot Springs",
        "Historic Site",
        "Rails Trails",
        "City Walk",
        "Pub Walk",
        "Event",
      ],
      default: "Attractions",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cloudinaryId: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Trail", TrailSchema);