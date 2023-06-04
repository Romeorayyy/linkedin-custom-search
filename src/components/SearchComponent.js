import React from 'react';
import { useSearch } from '../context/SearchContext';

const SearchComponent = () => {
  const {
    searchQuery,
    results,
    showResults,
    currentPage,
    incrementPage,
    decrementPage,
    handleSearchChange,
    handleSearchClick,
  } = useSearch();

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
          onChange={handleSearchChange}
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
          onClick={handleSearchClick}
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
                target="_blank"
                rel="noopener noreferrer"
              >
                {result.title}
              </a>
              <div style={{ color: '#006621', marginBottom: '0.5rem' }}>
                {result.url}
              </div>
              <p>{result.description}</p>
            </div>
          ))}
          <button onClick={decrementPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button onClick={incrementPage}>Next</button>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
