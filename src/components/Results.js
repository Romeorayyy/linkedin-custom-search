import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBTypography,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { useSearch } from '../context/SearchContext';

const Results = () => {
  const { handleLoadMore, metaData } = useSearch();

  return (
    <div>
      {metaData &&
        metaData.map((metatags) => {
          return (
            <MDBCard className="mb-3" key={metatags['og:url']}>
              <MDBCardBody>
                <MDBCardTitle className="fs-5 fw-bold text-primary">
                  <a
                    href={metatags['og:url']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                  >
                    {metatags['og:title']}
                  </a>
                </MDBCardTitle>
                <MDBTypography className="text-success mb-2" variant="muted">
                  {metatags['og:url']}
                </MDBTypography>
                {metatags['twitter:card'] &&
                  metatags['twitter:title'] &&
                  metatags['twitter:description'] && (
                    <div className="fw-bold">
                      <MDBTypography className="fw-bold" variant="muted">
                        <MDBCardText>
                          <MDBTypography className="fw-bold">
                            {metatags['twitter:title']}
                          </MDBTypography>
                          {metatags['twitter:description'].replace(
                            /<[^>]+>/g,
                            ''
                          )}
                        </MDBCardText>
                      </MDBTypography>
                    </div>
                  )}
              </MDBCardBody>
            </MDBCard>
          );
        })}
      {metaData.length > 0 && (
        <MDBBtn color="primary" onClick={handleLoadMore} className="mb-2">
          Load More
        </MDBBtn>
      )}
    </div>
  );
};

export default Results;
