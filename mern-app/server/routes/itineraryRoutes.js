const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  generateItinerary,
  getMyItineraries,
  getItinerary,
  deleteItinerary
} = require('../controllers/itineraryController');

// All routes are protected
router.post('/generate', protect, generateItinerary);
router.get('/my-itineraries', protect, getMyItineraries);
router.get('/:id', protect, getItinerary);
router.delete('/:id', protect, deleteItinerary);

module.exports = router;
