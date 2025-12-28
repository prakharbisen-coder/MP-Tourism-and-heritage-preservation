import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';

// Monastery data from original project with image paths
const monasteries = [
  { 
    name: "Rumtek Monastery", 
    location: "Gangtok, East Sikkim", 
    sect: "Kagyu", 
    founded: "16th century (rebuilt in 1960s)", 
    description: "The largest monastery in Sikkim; seat of the Karmapa Lama.",
    history: "Seat of the Karmapa Lama, also known as Dharma Chakra Centre. Largest monastery in Sikkim.", 
    wiki: "https://en.wikipedia.org/wiki/Rumtek_Monastery",
    image: "/img/RumtekMonastery.jpeg"
  },
  { 
    name: "Pemayangtse Monastery", 
    location: "Pelling, West Sikkim", 
    sect: "Nyingma", 
    founded: "1705", 
    description: "Historic Nyingma monastery, founded in 1705 near Pelling.",
    history: "One of the oldest monasteries, famous for its wooden structure Zangdok Palri.", 
    wiki: "https://en.wikipedia.org/wiki/Pemayangtse_Monastery",
    image: "/img/PemayangtseMonastery.jpeg"
  },
  { 
    name: "Tashiding Monastery", 
    location: "Near Yuksom, West Sikkim", 
    sect: "Nyingma", 
    founded: "1641", 
    description: "Considered the holiest monastery in Sikkim, built in 1641.",
    history: "Considered the holiest monastery in Sikkim, built by Ngadak Sempa Chempo.", 
    wiki: "https://en.wikipedia.org/wiki/Tashiding_Monastery",
    image: "/img/TashidingMonastery.jpeg"
  },
  { 
    name: "Phodong Monastery", 
    location: "North Sikkim", 
    sect: "Kagyu", 
    founded: "1740", 
    description: "18th-century Kagyu monastery famed for frescoes and festivals.",
    history: "Known for its frescoes and annual festivals.", 
    wiki: "https://en.wikipedia.org/wiki/Phodong_Monastery",
    image: "/img/PhodongMonastery.jpg"
  },
  { 
    name: "Enchey Monastery", 
    location: "Gangtok", 
    sect: "Nyingma", 
    founded: "1909", 
    description: "Gangtok's famed Nyingma monastery.",
    history: "Associated with Lama Drupthob Karpo, a tantric master.", 
    wiki: "https://en.wikipedia.org/wiki/Enchey_Monastery",
    image: "/img/EncheyMonastery.jpeg"
  },
  { 
    name: "Ralong Monastery", 
    location: "South Sikkim", 
    sect: "Kagyu", 
    founded: "18th century", 
    description: "Known for the Kagyed Dance Festival; rebuilt in 1995.",
    history: "Famous for the Kagyed Dance Festival and new monastery built in 1995.", 
    wiki: "https://en.wikipedia.org/wiki/Ralong_Monastery",
    image: "/img/RalongMonastery.jpeg"
  },
  { 
    name: "Lachen Monastery", 
    location: "Lachen, North Sikkim", 
    sect: "Nyingma", 
    founded: "1858", 
    description: "Ngodrub Choling (1858), spiritual center for Lachenpas.",
    history: "Known as Ngodrub Choling, it serves as spiritual center for Lachenpas.", 
    wiki: "https://en.wikipedia.org/wiki/Lachen_Monastery",
    image: "/img/Lachen_Monastery.jpeg"
  },
  { 
    name: "Dubdi Monastery", 
    location: "Yuksom, West Sikkim", 
    sect: "Nyingma", 
    founded: "1701", 
    description: "First monastery of Sikkim (1701).",
    history: "The first monastery built in Sikkim in 1701.", 
    wiki: "https://en.wikipedia.org/wiki/Dubdi_Monastery",
    image: "/img/DubdiMonastery.jpeg"
  }
];

const Monasteries = () => {
  const [filter, setFilter] = useState('All');
  const [filteredMonasteries, setFilteredMonasteries] = useState(monasteries);
  const [selectedMonastery, setSelectedMonastery] = useState(null);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredMonasteries(monasteries);
    } else {
      setFilteredMonasteries(monasteries.filter(m => m.sect === filter));
    }
  }, [filter]);

  const handleMoreClick = (monastery) => {
    setSelectedMonastery(monastery);
  };

  const closeModal = () => {
    setSelectedMonastery(null);
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div style={{ 
        paddingTop: '80px', 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: 'white',
        padding: '100px 20px 60px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '15px', fontWeight: 'bold' }}>
          Monasteries of Sikkim
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          Browse notable monasteries across Sikkim. Click a card to learn more.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '50px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Filter Buttons */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <button 
              onClick={() => setFilter('All')} 
              style={{ 
                margin: '5px', 
                padding: '12px 30px', 
                background: filter === 'All' ? '#007bff' : 'white', 
                color: filter === 'All' ? 'white' : '#333', 
                border: '2px solid #007bff',
                borderRadius: '25px', 
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '15px',
                transition: 'all 0.3s'
              }}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('Nyingma')} 
              style={{ 
                margin: '5px', 
                padding: '12px 30px', 
                background: filter === 'Nyingma' ? '#007bff' : 'white', 
                color: filter === 'Nyingma' ? 'white' : '#333', 
                border: '2px solid #007bff',
                borderRadius: '25px', 
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '15px',
                transition: 'all 0.3s'
              }}
            >
              Nyingma
            </button>
            <button 
              onClick={() => setFilter('Kagyu')} 
              style={{ 
                margin: '5px', 
                padding: '12px 30px', 
                background: filter === 'Kagyu' ? '#007bff' : 'white', 
                color: filter === 'Kagyu' ? 'white' : '#333', 
                border: '2px solid #007bff',
                borderRadius: '25px', 
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '15px',
                transition: 'all 0.3s'
              }}
            >
              Kagyu
            </button>
          </div>

          {/* Monasteries Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '30px' 
          }}>
            {filteredMonasteries.map((monastery, index) => (
              <div 
                key={index} 
                style={{ 
                  background: 'white', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
              >
                {/* Monastery Image */}
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img 
                    src={monastery.image} 
                    alt={monastery.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>

                {/* Card Content */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ 
                    marginBottom: '12px', 
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: '#1a1a1a'
                  }}>
                    {monastery.name}
                  </h3>
                  
                  <p style={{ 
                    color: '#666', 
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    marginBottom: '15px',
                    minHeight: '45px'
                  }}>
                    {monastery.description}
                  </p>

                  {/* Action Buttons */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginTop: '15px'
                  }}>
                    <a 
                      href={monastery.wiki} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        color: '#007bff', 
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '0.95rem'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      Learn more
                    </a>
                    
                    <button
                      onClick={() => handleMoreClick(monastery)}
                      style={{
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '8px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        transition: 'background 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#218838'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#28a745'}
                    >
                      More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for "More" button */}
      {selectedMonastery && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '15px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                fontSize: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                zIndex: 10
              }}
            >
              ×
            </button>

            {/* Modal Image */}
            <img 
              src={selectedMonastery.image} 
              alt={selectedMonastery.name}
              style={{ 
                width: '100%', 
                height: '300px', 
                objectFit: 'cover',
                borderRadius: '15px 15px 0 0'
              }}
            />

            {/* Modal Content */}
            <div style={{ padding: '30px' }}>
              <h2 style={{ marginBottom: '15px', color: '#1a1a1a' }}>
                {selectedMonastery.name}
              </h2>
              
              <div style={{ marginBottom: '20px' }}>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Location:</strong> {selectedMonastery.location}
                </p>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Sect:</strong> {selectedMonastery.sect}
                </p>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Founded:</strong> {selectedMonastery.founded}
                </p>
              </div>

              <h3 style={{ marginBottom: '10px', color: '#007bff' }}>History</h3>
              <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '20px' }}>
                {selectedMonastery.history}
              </p>

              <a 
                href={selectedMonastery.wiki} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#007bff',
                  color: 'white',
                  padding: '12px 30px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Read More on Wikipedia
              </a>
            </div>
          </div>
        </div>
      )}

      <FloatingChatbot />
    </>
  );
};

export default Monasteries;
