import React from 'react';
import Results from './components/Results';
import ProfileCard from './components/ProfileCard';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import SearchForms from './components/SearchForms';

const GoogleSearch = () => {
  return (
    <MDBContainer fluid className="p-5">
      <MDBRow className="justify-content-center">
        <MDBCol size="12" lg="6" className="px-5">
          <h1 className="search-header">Custom Google Search</h1>
          <SearchForms />
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

export default GoogleSearch;
