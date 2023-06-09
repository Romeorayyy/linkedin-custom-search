// /Users/randyyono/Desktop/google-search-app/src/App.js
import React from 'react';
import { SearchProvider } from './context/SearchContext';
import GoogleSearch from './GoogleSearch';
import ExportData from './components/ExportData';

function App() {
  return (
    <SearchProvider>
      <ExportData />
      <GoogleSearch />
    </SearchProvider>
  );
}

export default App;
