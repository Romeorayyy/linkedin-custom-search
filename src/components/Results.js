// /Users/randyyono/Desktop/google-search-app/src/Results.js
import React from 'react';
import { useSearch } from '../context/SearchContext';

const Results = () => {
  const { googleSearchResults, handleLoadMore } = useSearch();

  console.log(googleSearchResults);
  return (
    <div>
      {googleSearchResults &&
        googleSearchResults.map((result, index) => {
          const metatags = result.pagemap?.metatags?.[0];
          return (
            <div className="search-result" key={index}>
              <h3 className="result-title">
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                  {result.title}
                </a>
              </h3>
              <p className="result-url">{result.link}</p>
              {metatags && (
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
      {googleSearchResults.length > 0 && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default Results;
