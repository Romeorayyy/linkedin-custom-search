import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const searchGoogle = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/search', {
        params: {
          query: searchQuery,
        },
      });
      console.log(response.data.results);
      setResults(response.data.results);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Google Search App</h1>
        <input
          style={{
            width: '60%',
            padding: '1rem',
            fontSize: '1rem',
            marginTop: '2rem',
          }}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search term"
        />
        <button
          style={{
            marginLeft: '1rem',
            padding: '1rem 2rem',
            fontSize: '1rem',
            cursor: 'pointer',
            backgroundColor: '#4285F4',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
          onClick={searchGoogle}
        >
          Search
        </button>
      </div>
      {showResults && (
        <div>
          {results.map((result, index) => (
            <div
              key={index}
              style={{
                marginBottom: '1rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #ddd',
              }}
            >
              <a
                href={result.url}
                style={{ fontSize: '1.2rem', color: '#1a0dab' }}
              >
                {result.title}
              </a>
              <div style={{ color: '#006621', marginBottom: '0.5rem' }}>
                {result.url}
              </div>
              <p>{result.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
