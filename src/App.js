// /Users/randyyono/Desktop/google-search-app/src/App.js
import React from 'react';
import { SearchProvider } from './context/SearchContext';
import SearchComponent from './components/SearchComponent/SearchComponent';
import JobSearchComponent from './components/JobSearchComponent';

function App() {
  return (
    <SearchProvider>
      <SearchComponent />
      <JobSearchComponent />
    </SearchProvider>
  );
}

export default App;
