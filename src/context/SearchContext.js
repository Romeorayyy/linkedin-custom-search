// /Users/randyyono/Desktop/google-search-app/src/context/SearchContext.js

import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [googleSearchResults, setGoogleSearchResults] = useState([]);
  const [searchMeta, setSearchMeta] = useState([]);

  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/customsearch/v1',
        {
          params: {
            key: process.env.REACT_APP_API_KEY,
            cx: process.env.REACT_APP_API_CX,
            q: searchQuery,
          },
        }
      );
      // set results to the context state
      setGoogleSearchResults(response.data.items);
      console.log(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    googleSearchResults,
    setGoogleSearchResults,
    searchMeta,
    setSearchMeta,
    handleSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
