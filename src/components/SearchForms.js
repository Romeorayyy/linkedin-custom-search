import React from 'react';
import { MDBInput, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useSearch } from '../context/SearchContext';

const SearchForms = () => {
  const {
    handleSpecificSearchSubmit,
    jobTitle,
    handleSetJobTitle,
    locationKeywords,
    handleSetLocationKeyword,
    handleSearchSubmit,
    searchQuery,
    handleSearchQuery,
  } = useSearch();
  return (
    <MDBRow start className="px-5">
      <MDBCol start size="12" className="gy-4">
        {/* Job search form */}
        <form onSubmit={handleSpecificSearchSubmit}>
          <MDBRow className="gx-3">
            <MDBCol size="7">
              <MDBInput
                type="text"
                id="jobTitle"
                label="Job Title"
                value={jobTitle}
                onChange={handleSetJobTitle}
                size="lg"
                required
              />
            </MDBCol>
            <MDBCol size="7" className="gy-4">
              <MDBInput
                type="text"
                id="locationKeywords"
                label="Location or Keywords to Include"
                value={locationKeywords}
                onChange={handleSetLocationKeyword}
                size="lg"
                required
              />
            </MDBCol>
            <MDBCol size="12" className="gy-3">
              <MDBBtn color="info" type="submit">
                Generate Custom Search
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBCol>
      <MDBCol start size="12" className="gy-4">
        <form onSubmit={handleSearchSubmit}>
          <MDBRow className="gx-3">
            <MDBCol>
              <MDBInput
                type="text"
                id="form1"
                label="Enter your search query"
                value={searchQuery}
                onChange={handleSearchQuery}
                size="lg"
                required
              />
            </MDBCol>
            <MDBCol className="align-self-center">
              <MDBBtn color="dark" type="submit" size="lg">
                Search
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBCol>
    </MDBRow>
  );
};

export default SearchForms;
