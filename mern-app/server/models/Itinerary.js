const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  days: {
    type: Number,
    required: true,
    min: 1,
    max: 7
  },
  monasteries: [{
    name: String,
    location: String,
    day: Number,
    nearestTown: String,
    experiences: [String]
  }],
  startDate: {
    type: Date
  },
  notes: {
    type: String
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
