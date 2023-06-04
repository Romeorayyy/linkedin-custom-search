// /Users/randyyono/Desktop/google-search-app/src/context/SearchContext.js
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = async () => {
    setCurrentPage(1);
    searchGoogle(1); // set 1 to load first two pages
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  const incrementPage = () => {
    handlePageChange(currentPage + 2);
    console.log(currentPage);
  };

  const decrementPage = () => {
    if (currentPage > 2) {
      handlePageChange(currentPage - 2);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    searchGoogle(newPage);
    console.log(newPage);
  };

  const searchGoogle = async (page) => {
    try {
      const response1 = axios.get('http://localhost:4000/api/search', {
        params: {
          query: searchQuery,
          page: page - 1,
        },
      });

      const response2 = axios.get('http://localhost:4000/api/search', {
        params: {
          query: searchQuery,
          page: page,
        },
      });

      const allResponses = await Promise.all([response1, response2]);

      // combine the results from the two pages
      const combinedResults = [
        ...allResponses[0].data.results,
        ...allResponses[1].data.results,
      ];

      console.log(combinedResults);
      setResults(combinedResults);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const value = {
    searchQuery,
    results,
    showResults,
    currentPage,
    incrementPage,
    decrementPage,
    handleSearchChange,
    handleSearchClick,
    handleKeyDown, // Add this line
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
