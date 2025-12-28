import React from 'react';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';

const VirtualTours = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>360° Virtual Tours</h1>
          
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', marginBottom: '30px' }}>
              Experience immersive 360° virtual tours of Sikkim's beautiful monasteries
            </p>
            <a 
              href="https://www.360easyvr.com/vr/9098?scene_id=25635" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '15px 40px',
                background: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              Start Virtual Tour
            </a>
          </div>
        </div>
      </div>
      
      <FloatingChatbot />
    </>
  );
};

export default VirtualTours;
