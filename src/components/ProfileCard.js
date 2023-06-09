import React, { useState } from 'react';
import { useSearch } from '../context/SearchContext';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

const ProfileCard = () => {
  const { metaData, emailsData } = useSearch();

  const [expanded, setExpanded] = useState({});

  const getEmailFromUrl = (url) => {
    const emailData = emailsData.find((item) => item.ogUrl === url);
    return emailData ? emailData.email : null;
  };

  const toggleExpand = (url) => {
    setExpanded((prev) => ({
      ...prev,
      [url]: !prev[url],
    }));
  };

  const truncateDescription = (desc) => {
    const words = desc.split(' ');
    return words.length > 15 ? words.slice(0, 15).join(' ') + '...' : desc;
  };

  return (
    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
      {metaData &&
        metaData.map((metatags, index) => {
          const email = getEmailFromUrl(metatags['og:url']);
          const description = metatags['twitter:description'].replace(
            /<[^>]+>/g,
            ''
          );
          return metatags ? (
            <MDBCol>
              <MDBCard>
                <MDBCardImage
                  src={metatags['twitter:image']}
                  alt={metatags['twitter:title']}
                  position="top"
                />
                <MDBCardBody>
                  <MDBCardTitle>{metatags['twitter:title']}</MDBCardTitle>
                  {email && <p>Email: {email}</p>}
                  <MDBCardText>
                    {expanded[metatags['og:url']]
                      ? description
                      : truncateDescription(description)}
                    <span
                      style={{ color: 'blue', cursor: 'pointer' }}
                      onClick={() => toggleExpand(metatags['og:url'])}
                    >
                      {expanded[metatags['og:url']] ? ' See less' : ' See more'}
                    </span>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ) : null;
        })}
    </MDBRow>
  );
};

export default ProfileCard;
