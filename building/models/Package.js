const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  features: [String],
  category: {
    type: String,
    enum: ['house_plan', 'elevation', 'interior', 'cad'],
    required: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  duration: {
    type: String,
    required: true
  },
  revisions: {
    type: Number,
    default: 3
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Package', packageSchema);

