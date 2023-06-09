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
        metaData.map((metatags, index) => {
          const ogUrl = metatags && metatags['og:url'];
          const ogTitle = metatags && metatags['og:title'];
          const twitterCard = metatags && metatags['twitter:card'];
          const twitterTitle = metatags && metatags['twitter:title'];
          const twitterDescription =
            metatags && metatags['twitter:description'];

          if (!ogUrl) {
            return null;
          }

          return (
            <MDBCard className="mb-3" key={index}>
              <MDBCardBody>
                <MDBCardTitle className="fs-5 fw-bold text-primary">
                  <a
                    href={ogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                  >
                    {ogTitle}
                  </a>
                </MDBCardTitle>
                <MDBTypography className="text-success mb-2" variant="muted">
                  {ogUrl}
                </MDBTypography>
                {twitterCard && twitterTitle && twitterDescription && (
                  <div className="fw-bold">
                    <MDBTypography className="fw-bold" variant="muted">
                      <MDBCardText>
                        <MDBTypography className="fw-bold">
                          {twitterTitle}
                        </MDBTypography>
                        {twitterDescription.replace(/<[^>]+>/g, '')}
                      </MDBCardText>
                    </MDBTypography>
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
          );
        })}
      {metaData && metaData.length > 0 && (
        <MDBBtn color="primary" onClick={handleLoadMore} className="mb-2">
          Load More
        </MDBBtn>
      )}
    </div>
  );
};

export default Results;
