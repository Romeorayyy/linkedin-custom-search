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
    emailOption,
    handleEmailOptionChange,
  } = useSearch();

  return (
    <MDBRow start className="px-5">
      <MDBCol start size="12" className="gy-4">
        {/* Job search form */}
        <form onSubmit={handleSpecificSearchSubmit}>
          <MDBRow className="gx-3">
            <MDBCol size="12">
              <MDBInput
                type="text"
                id="jobTitle"
                label="Job Title"
                value={jobTitle}
                onChange={handleSetJobTitle}
                size="lg"
                required
                placeholder="Enter job title"
              />
            </MDBCol>
            <MDBCol size="12" className="gy-3">
              <MDBInput
                type="text"
                id="locationKeywords"
                label="Location or Keywords to Include"
                value={locationKeywords}
                onChange={handleSetLocationKeyword}
                size="lg"
                required
                placeholder="Enter location or keywords"
              />
            </MDBCol>

            {/* Email options */}
            <MDBRow>
              <MDBCol>
                <label>
                  <input
                    type="radio"
                    value="@gmail.com"
                    checked={emailOption === '@gmail.com'}
                    onChange={(e) => handleEmailOptionChange(e.target.value)}
                  />
                  Gmail
                </label>
              </MDBCol>
              <MDBCol>
                <label>
                  <input
                    type="radio"
                    value="@outlook.com"
                    checked={emailOption === '@outlook.com'}
                    onChange={(e) => handleEmailOptionChange(e.target.value)}
                  />
                  Outlook
                </label>
              </MDBCol>
              <MDBCol>
                <label>
                  <input
                    type="radio"
                    value="@yahoo.com"
                    checked={emailOption === '@yahoo.com'}
                    onChange={(e) => handleEmailOptionChange(e.target.value)}
                  />
                  Yahoo
                </label>
              </MDBCol>
            </MDBRow>

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
            <MDBCol size={10}>
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
            <MDBCol className="align-self-center" size={2}>
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
