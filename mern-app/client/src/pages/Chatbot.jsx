import React, { useState } from 'react';
import { chatbotAPI } from '../services/api';
import { getOfflineResponse } from '../utils/offlineChatbot';
import Navbar from '../components/Navbar';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: '🙏 Namaste! Ask me about any Sikkim monastery. Toggle between Online (AI) and Offline (Local Data) modes.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  const toggleMode = () => {
    const newMode = !isOfflineMode;
    setIsOfflineMode(newMode);
    setMessages(prev => [...prev, {
      type: 'system',
      text: `Switched to ${newMode ? 'Offline' : 'Online'} Mode ${newMode ? '📚' : '🤖'}`
    }]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setLoading(true);

    try {
      if (isOfflineMode) {
        // Use offline chatbot logic
        const response = getOfflineResponse(userMessage);
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'bot', text: response }]);
          setLoading(false);
        }, 300); // Simulate processing time
      } else {
        // Use online API
        const response = await chatbotAPI.chat({ message: userMessage });
        setMessages(prev => [...prev, { type: 'bot', text: response.data.reply }]);
        setLoading(false);
      }
    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', text: 'Sorry, I encountered an error. Please try again or switch to Offline Mode.' }]);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1 style={{ margin: 0 }}>AI Chatbot</h1>

            {/* Mode Toggle Button */}
            <button
              onClick={toggleMode}
              style={{
                padding: '10px 20px',
                background: isOfflineMode ? '#28a745' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ fontSize: '18px' }}>{isOfflineMode ? '📚' : '🤖'}</span>
              {isOfflineMode ? 'Offline Mode' : 'Online Mode'}
            </button>
          </div>

          <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', height: '500px', display: 'flex', flexDirection: 'column' }}>
            {/* Messages */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
              {messages.map((msg, index) => (
                <div key={index} style={{ marginBottom: '15px', textAlign: msg.type === 'user' ? 'right' : msg.type === 'system' ? 'center' : 'left' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '10px 15px',
                    borderRadius: '10px',
                    background: msg.type === 'user' ? '#007bff' : msg.type === 'system' ? '#ffc107' : '#e9ecef',
                    color: msg.type === 'user' ? 'white' : msg.type === 'system' ? '#000' : 'black',
                    maxWidth: msg.type === 'system' ? '90%' : '70%',
                    whiteSpace: 'pre-wrap',
                    fontStyle: msg.type === 'system' ? 'italic' : 'normal',
                    fontSize: msg.type === 'system' ? '13px' : '14px'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ textAlign: 'left' }}>
                  <div style={{ display: 'inline-block', padding: '10px 15px', borderRadius: '10px', background: '#e9ecef' }}>
                    Typing...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{ padding: '20px', borderTop: '1px solid #ddd', display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your question..."
                style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                style={{
                  padding: '10px 20px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Send
              </button>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '15px', background: isOfflineMode ? '#d4edda' : '#fff3cd', borderRadius: '5px', textAlign: 'center', border: `1px solid ${isOfflineMode ? '#c3e6cb' : '#ffeaa7'}` }}>
            <p style={{ margin: 0 }}>
              <strong>{isOfflineMode ? '📚 Offline Mode:' : '🤖 Online Mode:'}</strong>
              {isOfflineMode
                ? ' Using local monastery data for instant responses.'
                : ' Gemini AI integration requires API key configuration in the backend.'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
