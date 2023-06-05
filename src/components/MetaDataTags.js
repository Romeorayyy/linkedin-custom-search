// /Users/randyyono/Desktop/google-search-app/src/components/MetaDataTags.js

import React from 'react';
import { useSearch } from '../context/SearchContext';

const MetaDataTags = () => {
  const { googleSearchResults } = useSearch();

  const tagStyle = {
    backgroundColor: '#d3d3d3',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    display: 'inline-block',
  };

  return (
    <div>
      {googleSearchResults.map((result, index) => {
        const { title, totalResults, searchTerms, count, startIndex } =
          result.queries.request[0];
        console.log('Title:', title);
        console.log('Total Results:', totalResults);
        console.log('Search Terms:', searchTerms);
        console.log('Count:', count);
        console.log('Start Index:', startIndex);

        return (
          <div key={index}>
            <div style={tagStyle}>Title: {title}</div>
            <div style={tagStyle}>Total Results: {totalResults}</div>
            <div style={tagStyle}>Search Terms: {searchTerms}</div>
            <div style={tagStyle}>Count: {count}</div>
            <div style={tagStyle}>Start Index: {startIndex}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MetaDataTags;
