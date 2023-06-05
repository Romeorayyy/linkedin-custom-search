// /Users/randyyono/Desktop/google-search-app/src/GoogleSearch.js
import React, { useState } from 'react';
import { useSearch } from './context/SearchContext'; // import useSearch hook

const GoogleSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { googleSearchResults, handleSearch } = useSearch(); // fetch both googleSearchResults, setGoogleSearchResults, and handleSearch from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  console.log(googleSearchResults);

  return (
    <div>
      <div className="search-component-container">
        <h1 className="search-header">Custom Google Search</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            placeholder="Enter your search query"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <div>
          {googleSearchResults.map((result) => {
            const metatags = result.pagemap.metatags[0];
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
                {/* add new section for metatags */}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GoogleSearch;
