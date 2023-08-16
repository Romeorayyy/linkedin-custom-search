import React, { useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBListGroupItem,
  MDBCardLink,
  MDBCheckbox,
  MDBRow,
  MDBCol,
  MDBListGroup,
} from 'mdb-react-ui-kit';

const ProfileCard = () => {
  const { metaData, emailsData, selectedProfiles, toggleSelectedProfile } =
    useSearch();
  const [expanded, setExpanded] = useState({});
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  let rowClass = 'row-cols-1';
  if (windowSize <= 756) {
    rowClass = 'row-cols-1 row-cols-sm-1';
  } else if (windowSize <= 1000) {
    rowClass = 'row-cols-1 row-cols-md-2';
  } else if (windowSize <= 1200) {
    rowClass = 'row-cols-1 row-cols-md-3';
  } else if (windowSize <= 1500) {
    rowClass = 'row-cols-1 row-cols-md-4';
  } else {
    rowClass = 'row-cols-1 row-cols-lg-5';
  }

  return (
    <MDBRow className={rowClass}>
      {metaData &&
        metaData.map((metatags, index) => {
          if (!metatags) return null;

          const email = getEmailFromUrl(metatags['og:url']);
          const description = metatags['twitter:description']
            ? metatags['twitter:description'].replace(/<[^>]+>/g, '')
            : '';

          return (
            <MDBCol key={metatags['og:url']}>
              <MDBCard className="p-2 mt-5">
                <MDBCheckbox
                  id={`checkbox${index}`}
                  checked={selectedProfiles.includes(metatags['og:url'])}
                  onChange={() => toggleSelectedProfile(metatags['og:url'])}
                />
                <MDBCardImage
                  src={metatags['twitter:image']}
                  alt={metatags['twitter:title']}
                  position="top"
                />
                <MDBCardBody>
                  <MDBCardTitle>{metatags['twitter:title']}</MDBCardTitle>
                  <MDBListGroup className="py-3">
                    <MDBListGroupItem>
                      First Name: {metatags['profile:first_name']}
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      Last Name: {metatags['profile:last_name']}
                    </MDBListGroupItem>
                    {email && (
                      <MDBListGroupItem>Email: {email}</MDBListGroupItem>
                    )}
                  </MDBListGroup>
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
                <MDBCardBody>
                  <MDBCardLink
                    href={metatags['og:url']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Linkedin Profile
                  </MDBCardLink>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          );
        })}
    </MDBRow>
  );
};

export default ProfileCard;
