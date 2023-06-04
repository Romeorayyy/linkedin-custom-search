// /Users/randyyono/Desktop/google-search-app/src/components/SearchComponent/SearchComponent.js
import React from 'react';
import { useSearch } from '../../context/SearchContext';
import './SearchComponent.css';

const SearchComponent = () => {
  const {
    searchQuery,
    results,
    showResults,
    currentPage,
    incrementPage,
    decrementPage,
    handleSearchChange,
    handleKeyDown,
    handleSearchClick,
  } = useSearch();

  const displayedPageNumber = Math.ceil(currentPage / 2);

  return (
    <div className="search-component-container">
      <div className="search-header">
        <h1>Google Search App</h1>
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown} // Add this line
          placeholder="Enter search term"
        />
        <button className="search-button" onClick={handleSearchClick}>
          Search
        </button>
      </div>
      {showResults && (
        <div>
          {results.map((result, index) => (
            <div key={index} className="search-result">
              <a
                href={result.url}
                className="result-title"
                target="_blank"
                rel="noopener noreferrer"
              >
                {result.title}
              </a>
              <div className="result-url">{result.url}</div>
              <p>{result.description}</p>
            </div>
          ))}
          <button
            className="pagination-button"
            onClick={decrementPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="page-number">Page {displayedPageNumber}</span>
          <button className="pagination-button" onClick={incrementPage}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
