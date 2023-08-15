import React from 'react';

import Results from './components/Results';
import ProfileCard from './components/ProfileCard';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import SearchForms from './components/SearchForms';
import DataTable from './components/DataTable';

const GoogleSearch = () => {
  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center">
        <MDBCol xs={12} md={8} lg={6}>
          <h1 className="search-header">Custom Google Search</h1>
          <SearchForms />
          <Results />
        </MDBCol>

        <MDBCol xs={12} md={8} lg={6}>
          <DataTable />
          <ProfileCard />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default GoogleSearch;
