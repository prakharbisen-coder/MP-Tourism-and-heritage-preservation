const axios = require('axios');

// @desc    Chat with Gemini AI
// @route   POST /api/chatbot/chat
// @access  Public
exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(503).json({
        success: false,
        message: 'Gemini API key not configured. Please set GEMINI_API_KEY in .env file'
      });
    }

    // Call Google Gemini API using v1beta API with gemini-2.5-flash model
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const geminiResponse = await axios.post(geminiUrl, {
      contents: [{
        parts: [{
          text: `You are a knowledgeable assistant specializing in Sikkim's monastery heritage, Buddhist culture, and historical preservation. 
          
User Question: ${message}

Please provide detailed, accurate, and helpful information about Sikkim's monasteries, their history, cultural significance, and preservation efforts. If the question is not related to monasteries or Sikkim's heritage, politely redirect the conversation to these topics.`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    });
    
    const reply = geminiResponse.data.candidates[0].content.parts[0].text;
    
    res.status(200).json({
      success: true,
      reply: reply
    });
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to get response from AI. Please try again.',
      error: error.response?.data?.error?.message || error.message
    });
  }
};

// @desc    Analyze monastery image
// @route   POST /api/chatbot/analyze-image
// @access  Public
exports.analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }
    
    // Placeholder for image analysis
    const analysis = {
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: `/uploads/${req.file.filename}`,
      analysis: 'This feature requires Google Gemini Vision API integration for monastery image analysis.'
    };
    
    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
