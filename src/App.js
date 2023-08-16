// /Users/randyyono/Desktop/google-search-app/src/App.js
import React from 'react';
import { SearchProvider } from './context/SearchContext';
import GoogleSearch from './GoogleSearch';

function App() {
  return (
    <SearchProvider>
      <GoogleSearch />
    </SearchProvider>
  );
}

export default App;
