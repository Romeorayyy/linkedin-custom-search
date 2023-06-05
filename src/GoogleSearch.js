// /Users/randyyono/Desktop/google-search-app/src/GoogleSearch.js
import React from 'react';
import { useSearch } from './context/SearchContext'; // import useSearch hook

const GoogleSearch = () => {
  const {
    googleSearchResults,
    searchQuery,
    handleSearchQuery,
    handleSearchSubmit,
    error,
    allData,
    handleSearchTypeChange,
  } = useSearch();

  console.log(allData);

  return (
    <div>
      <div className="search-component-container">
        <h1 className="search-header">Custom Google Search</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSearchSubmit}>
          <input
            type="radio"
            value="query"
            name="searchType"
            onChange={() => handleSearchTypeChange('query')}
          />{' '}
          Query
          <input
            type="radio"
            value="image"
            name="searchType"
            onChange={() => handleSearchTypeChange('image')}
          />{' '}
          Image
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
        <div>
          {googleSearchResults &&
            googleSearchResults.map((result) => {
              const metatags = result.pagemap?.metatags?.[0]; // Use optional chaining to handle undefined values
              return (
                <div className="search-result" key={result.link}>
                  <h3 className="result-title">
                    <a
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.title}
                    </a>
                  </h3>
                  <p className="result-url">{result.link}</p>
                  <p>{result.snippet}</p>
                  {metatags && ( // Add conditional rendering for metatags
                    <div className="metatags">
                      {metatags['twitter:card'] &&
                        metatags['twitter:title'] &&
                        metatags['twitter:description'] &&
                        metatags['twitter:image'] && (
                          <div className="twitter-card">
                            <img
                              src={metatags['twitter:image']}
                              alt={metatags['twitter:title']}
                            />
                            <h4>{metatags['twitter:title']}</h4>
                            <p>
                              {metatags['twitter:description'].replace(
                                /<[^>]+>/g,
                                ''
                              )}
                            </p>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default GoogleSearch;
