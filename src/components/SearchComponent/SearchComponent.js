import React from 'react';
import { useSearch } from '../../context/SearchContext';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

const SearchComponent = () => {
  const {
    searchQuery,
    results,
    showResults,
    currentPage,
    incrementPage,
    decrementPage,
    handleSearchChange,
    handleKeyDown,
    handleSearchClick,
  } = useSearch();
  const displayedPageNumber = Math.ceil(currentPage / 2);

  return (
    <MDBContainer fluid className="search-component-container">
      <MDBRow className="justify-content-center">
        <MDBCol md="6" className="text-center">
          <div className="search-header">
            <h1>Google Search App</h1>
            <input
              className="search-input"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter search term"
            />
            <button className="search-button" onClick={handleSearchClick}>
              Search
            </button>
          </div>
        </MDBCol>
      </MDBRow>
      {showResults && (
        <div>
          {results.map((result, index) => (
            <MDBRow key={index}>
              <MDBCol md="8" className="offset-md-2">
                <div className="search-result">
                  <a
                    href={result.url}
                    className="result-title"
                    target="\_blank"
                    rel="noopener noreferrer"
                  >
                    {result.title}
                  </a>
                  <div className="result-url">{result.url}</div>
                  <p>{result.description}</p>
                </div>
              </MDBCol>
            </MDBRow>
          ))}
          <MDBRow className="justify-content-center">
            <button
              className="pagination-button"
              onClick={decrementPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-number">Page {displayedPageNumber}</span>
            <button className="pagination-button" onClick={incrementPage}>
              Next
            </button>
          </MDBRow>
        </div>
      )}
    </MDBContainer>
  );
};

export default SearchComponent;
