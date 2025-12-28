const Itinerary = require('../models/Itinerary');

// Monastery data for itinerary generation
const monasteryData = [
  { name: "Rumtek Monastery", location: "Gangtok, East Sikkim", nearestTown: "Gangtok (24 km)", experiences: ["Visit Golden Stupa", "Attend prayer ceremonies", "Explore monastery museum"] },
  { name: "Pemayangtse Monastery", location: "Pelling, West Sikkim", nearestTown: "Pelling (6 km)", experiences: ["See Zangdok Palri model", "Panoramic mountain views", "Ancient Buddhist art"] },
  { name: "Tashiding Monastery", location: "Near Yuksom, West Sikkim", nearestTown: "Yuksom (19 km)", experiences: ["Holy Bumchu festival", "Sacred stupa pilgrimage", "Peaceful meditation"] },
  { name: "Phodong Monastery", location: "North Sikkim", nearestTown: "Gangtok (38 km)", experiences: ["Beautiful frescoes", "Annual mask dance", "Mountain scenery"] },
  { name: "Enchey Monastery", location: "Gangtok", nearestTown: "Gangtok (3 km)", experiences: ["City views", "Traditional architecture", "Local festivals"] },
  { name: "Ralong Monastery", location: "South Sikkim", nearestTown: "Ravangla (10 km)", experiences: ["Kagyed Dance Festival", "Buddha Park nearby", "Scenic location"] },
  { name: "Lachung Monastery", location: "Lachung, North Sikkim", nearestTown: "Lachung (0 km)", experiences: ["Mask dance festival", "Alpine surroundings", "Local culture"] }
];

// @desc    Generate itinerary
// @route   POST /api/itinerary/generate
// @access  Private
exports.generateItinerary = async (req, res) => {
  try {
    const { days, title, startDate, notes } = req.body;
    
    if (!days || days < 1 || days > 7) {
      return res.status(400).json({
        success: false,
        message: 'Days must be between 1 and 7'
      });
    }
    
    // Select monasteries based on days
    const selectedMonasteries = monasteryData.slice(0, Math.min(days, monasteryData.length));
    
    // Assign monasteries to days
    const monasteries = selectedMonasteries.map((monastery, index) => ({
      ...monastery,
      day: index + 1
    }));
    
    const itinerary = await Itinerary.create({
      userId: req.user.id,
      userName: req.user.name,
      title: title || `${days}-Day Sikkim Monastery Tour`,
      days,
      monasteries,
      startDate,
      notes
    });
    
    res.status(201).json({
      success: true,
      message: 'Itinerary generated successfully',
      itinerary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's itineraries
// @route   GET /api/itinerary/my-itineraries
// @access  Private
exports.getMyItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: itineraries.length,
      itineraries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single itinerary
// @route   GET /api/itinerary/:id
// @access  Private
exports.getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }
    
    // Check authorization
    if (itinerary.userId.toString() !== req.user.id && !itinerary.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this itinerary'
      });
    }
    
    res.status(200).json({
      success: true,
      itinerary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete itinerary
// @route   DELETE /api/itinerary/:id
// @access  Private
exports.deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }
    
    // Check authorization
    if (itinerary.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this itinerary'
      });
    }
    
    await itinerary.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Itinerary deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
