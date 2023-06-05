// /Users/randyyono/Desktop/google-search-app/src/App.js
import React from 'react';
import { SearchProvider } from './context/SearchContext';
import JobSearchComponent from './components/JobSearchComponent';
import GoogleSearch from './GoogleSearch';

function App() {
  return (
    <SearchProvider>
      <GoogleSearch />
      <JobSearchComponent />
    </SearchProvider>
  );
}

export default App;
