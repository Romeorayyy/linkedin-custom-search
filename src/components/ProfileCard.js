import React, { useState } from 'react';
import { useSearch } from '../context/SearchContext';
import DataTable from './DataTable';
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
  const { metaData, emailsData } = useSearch();
  const [expanded, setExpanded] = useState({});
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  const toggleSelectedProfile = (url) => {
    if (selectedProfiles.includes(url)) {
      setSelectedProfiles(
        selectedProfiles.filter((profileUrl) => profileUrl !== url)
      );
    } else {
      setSelectedProfiles([...selectedProfiles, url]);
    }
  };

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

  console.log(metaData);

  return (
    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
      <DataTable selectedProfiles={selectedProfiles} />
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
          ) : null;
        })}
    </MDBRow>
  );
};

export default ProfileCard;
