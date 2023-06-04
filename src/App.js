import React from 'react';
import { SearchProvider } from './context/SearchContext';
import SearchComponent from './components/SearchComponent/SearchComponent';

function App() {
  return (
    <SearchProvider>
      <SearchComponent />
    </SearchProvider>
  );
}

export default App;
