///Users/randyyono/Desktop/google-search-app/src/components/DataTable.js

import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useSearch } from '../context/SearchContext';

const DataTable = () => {
  const { metaData, emailsData, selectedProfiles } = useSearch();
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
    return words.length > 8 ? words.slice(0, 8).join(' ') + '...' : desc;
  };

  // console.log(selectedProfiles);

  return (
    selectedProfiles?.length > 0 && (
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Linkedin Title</th>
            <th scope="col">Description</th>
            <th scope="col">URL</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {metaData &&
            metaData
              .filter((metatags) =>
                selectedProfiles.includes(metatags['og:url'])
              )
              .map((metatags) => {
                const email = getEmailFromUrl(metatags['og:url']);
                const description = metatags['twitter:description'].replace(
                  /<[^>]+>/g,
                  ''
                );
                return metatags ? (
                  <tr key={metatags['og:url']}>
                    <td>{metatags['profile:first_name']}</td>
                    <td>{metatags['profile:last_name']}</td>
                    <td>{email}</td>
                    <td>{metatags['twitter:title']}</td>
                    <td>
                      {expanded[metatags['og:url']]
                        ? description
                        : truncateDescription(description)}
                      <span
                        style={{ color: 'blue', cursor: 'pointer' }}
                        onClick={() => toggleExpand(metatags['og:url'])}
                      >
                        {expanded[metatags['og:url']]
                          ? ' See less'
                          : ' See more'}
                      </span>
                    </td>
                    <td>
                      <a
                        href={metatags['og:url']}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Linkedin Profile
                      </a>
                    </td>
                  </tr>
                ) : null;
              })}
        </MDBTableBody>
      </MDBTable>
    )
  );
};

export default DataTable;
