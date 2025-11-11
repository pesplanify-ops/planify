const mongoose = require("mongoose");

const housePlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  // Plot dimensions (e.g., "30x40", "30x50", "40x60")
  plotDimension: {
    type: String,
    required: true,
  },
  // BHK (e.g., "1", "2", "3", "4", "5")
  bhk: {
    type: String,
    required: true,
  },
  // Number of floors
  floors: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  // House facing direction
  facing: {
    type: String,
    enum: ["north", "south", "east", "west", "any"],
    default: "any",
  },
  // Price for the plan
  price: {
    type: Number,
    required: true,
  },
  // Image filename (stored in uploads folder)
  image: {
    type: String,
    required: true,
  },
  // Additional features
  features: [
    {
      type: String,
    },
  ],
  // Area in square feet
  area: {
    type: Number,
  },
  // Style (modern, traditional, contemporary, etc.)
  style: {
    type: String,
    default: "modern",
  },
  // Availability status
  isAvailable: {
    type: Boolean,
    default: true,
  },
  // Admin who uploaded
  uploadedBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
housePlanSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("HousePlan", housePlanSchema);
