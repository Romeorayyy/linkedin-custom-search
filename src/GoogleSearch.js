// /Users/randyyono/Desktop/google-search-app/src/GoogleSearch.js
import React from 'react';
import { useSearch } from './context/SearchContext';
import Results from './components/Results';
import ProfileCard from './components/ProfileCard';

const MergedSearch = () => {
  const {
    searchQuery,
    handleSearchQuery,
    handleSearchSubmit,
    error,
    locationKeywords,
    jobTitle,
    outputKeywordSearch,
    handleSetLocationKeyword,
    handleSetJobTitle,
    handleSpecificSearchSubmit,
    handleLoadMore,
  } = useSearch();

  return (
    <div>
      <div className="search-component-container">
        <h1 className="search-header">Merged Custom Google Search</h1>
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

        {/* Job search form */}
        <form onSubmit={handleSpecificSearchSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="jobTitle">Job Title:</label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={handleSetJobTitle}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="locationKeywords">
              Location or Keywords to Include:
            </label>
            <input
              type="text"
              id="locationKeywords"
              value={locationKeywords}
              onChange={handleSetLocationKeyword}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>

          <button type="submit" style={{ padding: '5px 10px' }}>
            Generate Query
          </button>
        </form>

        <Results />
        <ProfileCard />
      </div>
    </div>
  );
};

export default MergedSearch;
