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
    searchGoogle(currentPage);
  };

  const incrementPage = () => {
    handlePageChange(currentPage + 1);
    console.log(currentPage);
  };

  const decrementPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    searchGoogle(newPage);
    console.log(newPage);
  };

  const searchGoogle = async (page) => {
    try {
      const response = await axios.get('http://localhost:4000/api/search', {
        params: {
          query: searchQuery,
          page: page - 1,
        },
      });
      console.log(response.data.results);
      setResults(response.data.results);
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
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
