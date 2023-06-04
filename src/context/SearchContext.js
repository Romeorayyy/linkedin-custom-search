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
  const [page, setPage] = useState(0);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = async () => {
    searchGoogle(page);
  };

  const loadMoreResults = () => {
    setPage(page + 1);
    searchGoogle(page);
  };

  const incrementPage = () => {
    handlePageChange(currentPage + 1);
  };

  const decrementPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  console.log(page);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    searchGoogle(newPage);
  };

  const searchGoogle = async (page) => {
    try {
      const response = await axios.get('http://localhost:4000/api/search', {
        params: {
          query: searchQuery,
          page: page,
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
    loadMoreResults: loadMoreResults,
    handleSearchChange,
    handleSearchClick,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
