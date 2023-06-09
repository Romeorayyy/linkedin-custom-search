import React from 'react';
import { useSearch } from './context/SearchContext';
import Results from './components/Results';
import ProfileCard from './components/ProfileCard';
import {
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

const MergedSearch = () => {
  const {
    searchQuery,
    handleSearchQuery,
    handleSearchSubmit,
    error,
    locationKeywords,
    jobTitle,
    handleSetLocationKeyword,
    handleSetJobTitle,
    handleSpecificSearchSubmit,
  } = useSearch();

  return (
    <MDBContainer fluid className="p-5">
      <MDBRow className="justify-content-center">
        <MDBCol size="12" lg="6" className="px-5">
          <h1 className="search-header">Merged Custom Google Search</h1>
          {error && <div className="error">{error}</div>}
          <MDBRow start className="px-5">
            <MDBCol start size="12">
              <form onSubmit={handleSearchSubmit}>
                <MDBRow className="gx-3">
                  {/* Add a row with horizontal gutter space */}
                  <MDBCol>
                    {/* Add col components for alignment */}
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
                  <MDBCol>
                    <MDBBtn color="dark" type="submit">
                      Search
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBCol>
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
                  <MDBCol size="12" className="gy-2">
                    <MDBBtn color="dark" type="submit">
                      Generate Query
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBCol>
          </MDBRow>
          <MDBCol size="12" className="p-5">
            <Results />
          </MDBCol>
        </MDBCol>
        <MDBCol size="12" lg="6" className="p-5">
          <ProfileCard />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default MergedSearch;
