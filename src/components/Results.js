// /Users/randyyono/Desktop/google-search-app/src/components/Results.js

import React from 'react';
import { useSearch } from '../context/SearchContext';

const Results = () => {
  const { handleLoadMore, metaData } = useSearch();

  return (
    <div>
      {metaData &&
        metaData.map((metatags) => {
          return (
            <div className="search-result" key={metatags['og:url']}>
              <h3 className="result-title">
                <a
                  href={metatags['og:url']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {metatags['og:title']}
                </a>
              </h3>
              <p className="result-url">{metatags['og:url']}</p>
              {metatags['twitter:card'] &&
                metatags['twitter:title'] &&
                metatags['twitter:description'] && (
                  <div className="metatags">
                    <div className="twitter-card">
                      <h4>{metatags['twitter:title']}</h4>
                      <p>
                        {metatags['twitter:description'].replace(
                          /<[^>]+>/g,
                          ''
                        )}
                      </p>
                    </div>
                  </div>
                )}
            </div>
          );
        })}
      {metaData.length > 0 && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default Results;
