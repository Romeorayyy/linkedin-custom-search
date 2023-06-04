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

  const loadMoreResults = () => {
    setPage(page + 1);
    searchGoogle();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    searchGoogle(newPage);
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
    setSearchQuery,
    results,
    setResults,
    showResults,
    setShowResults,
    currentPage,
    setCurrentPage,
    page,
    setPage,
    loadMoreResults,
    handlePageChange,
    searchGoogle,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
