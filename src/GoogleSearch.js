import React, { useState } from 'react';
import ProfileCard from './components/ProfileCard';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import SearchForms from './components/SearchForms';
import DataTableModal from './components/DataTableModal';
import { useSearch } from './context/SearchContext';

const GoogleSearch = () => {
  const { handleLoadMore, metaData, selectedProfiles, googleSearchResults } =
    useSearch();

  const [showTableModal, setShowTableModal] = useState(false);

  const toggleModal = () => {
    setShowTableModal(!showTableModal);
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center">
        <MDBCol xs={12} md={12} lg={12}>
          <h1 className="search-header">Custom LinkedIn Search</h1>
          <SearchForms />

          {googleSearchResults && googleSearchResults.length > 0 ? (
            <ProfileCard />
          ) : (
            <div>Sorry, no results found..</div>
          )}

          {metaData && metaData.length > 0 && (
            <MDBBtn
              color="primary"
              onClick={handleLoadMore}
              className="mb-2 mt-4"
            >
              Load More
            </MDBBtn>
          )}
        </MDBCol>
      </MDBRow>

      {/* Positioned "View Table" button */}
      {selectedProfiles.length > 0 && (
        <MDBBtn
          color="primary"
          onClick={toggleModal}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 999,
          }}
        >
          View Table
        </MDBBtn>
      )}

      <DataTableModal
        showTableModal={showTableModal}
        toggleModal={toggleModal}
      />
    </MDBContainer>
  );
};

export default GoogleSearch;
