// /Users/randyyono/Desktop/google-search-app/src/components/JobSearchComponent.js

import React from 'react';
import { useSearch } from '../context/SearchContext'; // import useSearch hook

const JobSearchComponent = () => {
  const {
    locationKeywords,
    jobTitle,
    outputKeywordSearch,
    handleSetLocationKeyword,
    handleSetJobTitle,
    handleEmailOptionChange,
    emailOption,
    handleSpecificSearchSubmit,
    handleLoadMore,
  } = useSearch();

  return (
    <div
      style={{
        fontFamily: 'Arial',
        maxWidth: '25%',
        margin: '0',
        padding: '5rem',
      }}
    >
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
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <div>
            <input
              type="radio"
              id="gmail"
              name="emailOption"
              value="@gmail.com"
              checked={emailOption === '@gmail.com'}
              onChange={() => handleEmailOptionChange('@gmail.com')}
              style={{ marginRight: '5px' }}
            />
            <label htmlFor="gmail">@gmail.com</label>
          </div>
          <div>
            <input
              type="radio"
              id="yahoo"
              name="emailOption"
              value="@yahoo.com"
              checked={emailOption === '@yahoo.com'}
              onChange={() => handleEmailOptionChange('@yahoo.com')}
              style={{ marginRight: '5px' }}
            />
            <label htmlFor="yahoo">@yahoo.com</label>
          </div>
          <div>
            <input
              type="radio"
              id="outlook"
              name="emailOption"
              value="@outlook.com"
              checked={emailOption === '@outlook.com'}
              onChange={() => handleEmailOptionChange('@outlook.com')}
              style={{ marginRight: '5px' }}
            />
            <label htmlFor="outlook">@outlook.com</label>
          </div>
        </div>
        <button type="submit" style={{ padding: '5px 10px' }}>
          Submit
        </button>
      </form>
      {outputKeywordSearch && (
        <h3 style={{ marginTop: '20px', width: '100%' }}>
          {outputKeywordSearch}
        </h3>
      )}
      <button onClick={handleLoadMore} className="load-more-button">
        Load More
      </button>
    </div>
  );
};

export default JobSearchComponent;
