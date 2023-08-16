import React, { useEffect, useState } from 'react';
import Results from './components/Results';
import ProfileCard from './components/ProfileCard';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import SearchForms from './components/SearchForms';
import DataTable from './components/DataTable';

const GoogleSearch = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(
    window.innerWidth >= 768 && window.innerWidth < 992
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768 && window.innerWidth < 992);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMediumScreen) {
    return (
      <MDBContainer fluid>
        <MDBRow className="justify-content-center">
          <MDBCol xs={12} md={8} lg={6}>
            <h1 className="search-header">Custom Google Search</h1>
            <SearchForms />
            <DataTable />
            <ProfileCard />
            <Results />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  } else {
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
  }
};

export default GoogleSearch;
