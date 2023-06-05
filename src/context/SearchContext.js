// /Users/randyyono/Desktop/google-search-app/src/context/SearchContext.js

import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [locationKeywords, setLocationKeywords] = useState('');
  const [emailOption, setEmailOption] = useState('@gmail.com');
  const [outputKeywordSearch, setOutputKeyWordSearch] = useState('');
  const [googleSearchResults, setGoogleSearchResults] = useState([]);
  const [searchMeta, setSearchMeta] = useState([]);
  const [error, setError] = useState(null);
  const [allData, setAllData] = useState([]);
  const [selectSearchType, setSelectSearchType] = useState('query');

  const handleSearch = async () => {
    try {
      const params = {
        params: {
          key: process.env.REACT_APP_API_KEY,
          cx: process.env.REACT_APP_API_CX,
          q: searchQuery,
        },
      };

      if (selectSearchType === 'image') {
        params.params.searchType = 'image';
      }

      console.log(params);

      const response = await axios.get(
        'https://www.googleapis.com/customsearch/v1',
        params
      );

      setGoogleSearchResults(response.data.items);
      setAllData(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleSearchTypeChange = (value) => {
    setSelectSearchType(value);
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  // JobSearchComponent.js

  const handleSpecificSearchSubmit = (e) => {
    e.preventDefault();

    const formattedJobTitle = `${formatKeywords(jobTitle)}`;
    const formattedLocationKeywords = `${formatKeywords(locationKeywords)}`;

    const outputText = `${formattedJobTitle} ${formattedLocationKeywords} -intitle:"profiles" -inurl:"dir/ " email "${emailOption}" site:www.linkedin.com/in/ OR site:www.linkedin.com/pub/`;
    setOutputKeyWordSearch(outputText);
  };

  const formatKeywords = (keywords) => {
    return keywords
      .split(/\b(and|or)\b/i)
      .map((keyword) =>
        keyword.trim() === 'and' || keyword.trim() === 'or'
          ? keyword.trim().toUpperCase()
          : `"${keyword.trim()}"`
      )
      .join(' ');
  };

  const handleSetLocationKeyword = (e) => {
    setLocationKeywords(e.target.value);
  };

  const handleSetJobTitle = (e) => {
    setJobTitle(e.target.value);
  };

  const handleEmailOptionChange = (option) => {
    setEmailOption(option);
  };

  // JobSearchComponent.js

  const value = {
    googleSearchResults,
    searchMeta,
    searchQuery,
    emailOption,
    outputKeywordSearch,
    error,
    allData,
    selectSearchType,
    handleSearchTypeChange,
    handleEmailOptionChange,
    handleSetJobTitle,
    handleSetLocationKeyword,
    handleSpecificSearchSubmit,
    formatKeywords,
    handleSearchSubmit,
    handleSearchQuery,
    setGoogleSearchResults,
    setSearchMeta,
    handleSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
