// /Users/randyyono/Desktop/google-search-app/src/GoogleSearch.js
import React from 'react';
import { useSearch } from './context/SearchContext';
import Results from './components/Results'; // import Results component

const GoogleSearch = () => {
  const {
    googleSearchResults,
    searchQuery,
    handleSearchQuery,
    handleSearchSubmit,
    handleLoadMore,
    error,
    allData,
  } = useSearch();

  console.log(allData);

  return (
    <div>
      <div className="search-component-container">
        <h1 className="search-header">Custom Google Search</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQuery}
            className="search-input"
            placeholder="Enter your search query"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <Results googleSearchResults={googleSearchResults} />{' '}
      </div>
    </div>
  );
};

export default GoogleSearch;
