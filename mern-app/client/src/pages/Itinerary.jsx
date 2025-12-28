import React, { useState } from 'react';
import { itineraryAPI } from '../services/api';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';

const Itinerary = () => {
  const [days, setDays] = useState(3);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateItinerary = async () => {
    setLoading(true);
    try {
      const response = await itineraryAPI.generateItinerary({ days });
      setItinerary(response.data.itinerary);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to generate itinerary');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!itinerary) return;
    
    const content = `
${itinerary.title}
${'='.repeat(50)}

${itinerary.monasteries.map(m => `
Day ${m.day}: ${m.name}
Location: ${m.location}
Nearest Town: ${m.nearestTown}
Experiences: ${m.experiences.join(', ')}
`).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'monastery-itinerary.txt';
    a.click();
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Travel Itinerary Planner</h1>
          
          <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Select number of days (1-7):
            </label>
            <input
              type="number"
              min="1"
              max="7"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '20px' }}
            />
            
            <button
              onClick={generateItinerary}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Generating...' : 'Generate Itinerary'}
            </button>
          </div>

          {itinerary && (
            <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ marginBottom: '20px' }}>{itinerary.title}</h2>
              
              {itinerary.monasteries.map((monastery) => (
                <div key={monastery.day} style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                  <h3 style={{ color: '#007bff', marginBottom: '10px' }}>Day {monastery.day}: {monastery.name}</h3>
                  <p><strong>Location:</strong> {monastery.location}</p>
                  <p><strong>Nearest Town:</strong> {monastery.nearestTown}</p>
                  <p><strong>Experiences:</strong></p>
                  <ul>
                    {monastery.experiences.map((exp, index) => (
                      <li key={index}>{exp}</li>
                    ))}
                  </ul>
                </div>
              ))}
              
              <button
                onClick={downloadPDF}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Download Itinerary
              </button>
            </div>
          )}
        </div>
      </div>
      
      <FloatingChatbot />
    </>
  );
};

export default Itinerary;
