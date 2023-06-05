// /Users/randyyono/Desktop/google-search-app/src/components/MetaDataTagsTable.js

import React from 'react';
import { useSearch } from '../context/SearchContext'; // import useSearch hook

const MetaDataTagsTable = () => {
  const { googleSearchResults } = useSearch(); // fetch googleSearchResults from context

  const headers =
    googleSearchResults.length > 0
      ? Object.keys(googleSearchResults[0].pagemap.metatags[0])
      : [];

  const tableStyle = {
    border: '1px solid black',
    borderCollapse: 'collapse',
    width: '100%',
    textAlign: 'left',
  };

  const thTdStyle = {
    border: '1px solid black',
    padding: '10px',
  };

  console.log(googleSearchResults);

  return (
    <>
      {
        <table style={tableStyle}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th style={thTdStyle} key={index}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {googleSearchResults.map((result, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, cellIndex) => (
                  <td style={thTdStyle} key={cellIndex}>
                    {result.pagemap.metatags[0][header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
  );
};

export default MetaDataTagsTable;
