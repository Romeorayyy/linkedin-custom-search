// /Users/randyyono/Desktop/google-search-app/src/context/SearchContext.js

import { createContext, useContext, useState, useEffect } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [jobSearchQuery, setJobSearchQuery] = useState(''); // Add this line
  const [metaData, setMetaData] = useState([]); // New state variable
  const [dataGetter, setDataGetter] = useState([]);
  const [emailsData, setEmailsData] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  const handleSearch = async (searchQuery, page, appendResults = false) => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/customsearch/v1',
        {
          params: {
            key: process.env.REACT_APP_API_KEY,
            cx: process.env.REACT_APP_API_CX,
            q: searchQuery,
            siteSearch: 'www.linkedin.com/in/',
            siteSearchFilter: 'I',
            filter: '0',
            start: page,
          },
        }
      );

      if (appendResults) {
        // Append results to the existing ones if appendResults is true
        setGoogleSearchResults([
          ...googleSearchResults,
          ...response.data.items,
        ]);
      } else {
        // Replace the existing results if appendResults is false
        setGoogleSearchResults(response.data.items);
      }

      console.log(response.data.items);
      setAllData(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message); // set the error message
    }
  };
  console.log(allData);
  useEffect(() => {
    const newMetaData = googleSearchResults.map(
      (result) => result.pagemap?.metatags?.[0]
    );
    setMetaData(newMetaData);
  }, [googleSearchResults]);

  useEffect(() => {
    if (Array.isArray(googleSearchResults)) {
      const newDataGetter = googleSearchResults.map((item) => ({
        ogUrl: item?.pagemap?.metatags[0]['og:url'],
        snippet: item?.snippet,
        htmlSnippet: item?.htmlSnippet,
        ogDescription: item?.pagemap?.metatags?.[0]?.['og:description'],
        twitterDescription:
          item?.pagemap?.metatags?.[0]?.['twitter:description'],
      }));

      setDataGetter(newDataGetter);
    } else {
      // `googleSearchResults` is not an array; handle this case appropriately
      setDataGetter([]);
    }
  }, [googleSearchResults]);

  // console.log(dataGetter);

  const extractEmails = (text) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const found = text.match(emailRegex);
    return found ? found[0] : '';
  };

  useEffect(() => {
    const extractedEmails = dataGetter
      .map((data, index) => {
        const keysToSearch = [
          'snippet',
          'htmlSnippet',
          'ogDescription',
          'twitterDescription',
        ];
        let email = '';
        for (let key of keysToSearch) {
          if (data[key]) {
            email = extractEmails(data[key]);
            if (email) {
              return { email, ogUrl: data.ogUrl };
            }
          }
        }
        return null; // Return null if no email was found
      })
      .filter((item) => item !== null); // Filter out null items

    setEmailsData(extractedEmails);
  }, [dataGetter]);

  // console.log(emailsData);

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    handleSearch(searchQuery, 1, false);
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 10; // calculate the next page value
    setCurrentPage(nextPage); // update the current page
    await handleSearch(jobSearchQuery || searchQuery, nextPage, true); // Add true to append results
  };

  // JobSearchComponent.js
  const handleSpecificSearchSubmit = (e) => {
    e.preventDefault();
    const formattedJobTitle = `${formatKeywords(jobTitle)}`;
    const formattedLocationKeywords = `${formatKeywords(locationKeywords)}`;
    const outputText = `${formattedJobTitle} ${formattedLocationKeywords} -intitle:"profiles" -inurl:"dir/ " email "${emailOption}" site:www.linkedin.com/in/ OR site:www.linkedin.com/pub/`;
    setOutputKeyWordSearch(outputText);
    setSearchQuery(outputText); // Set the generated query as the search query
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

  // Checkbox table features

  const toggleSelectedProfile = (url) => {
    if (selectedProfiles.includes(url)) {
      setSelectedProfiles(
        selectedProfiles.filter((profileUrl) => profileUrl !== url)
      );
    } else {
      setSelectedProfiles([...selectedProfiles, url]);
    }
  };

  // Checkbox table features

  const value = {
    googleSearchResults,
    searchMeta,
    searchQuery,
    emailOption,
    outputKeywordSearch,
    error, // get the error from the context
    allData,
    metaData,
    emailsData,
    selectedProfiles,
    toggleSelectedProfile,
    handleLoadMore,
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
