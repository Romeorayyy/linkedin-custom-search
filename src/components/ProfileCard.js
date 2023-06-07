import React, { useState } from 'react';
import { useSearch } from '../context/SearchContext';

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
    return words.length > 30 ? words.slice(0, 30).join(' ') + '...' : desc;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        height: '500px',
      }}
    >
      {metaData &&
        metaData.map((metatags, index) => {
          const email = getEmailFromUrl(metatags['og:url']);
          const description = metatags['twitter:description'].replace(
            /<[^>]+>/g,
            ''
          );
          return metatags ? (
            <div
              className="profile-card"
              key={metatags['og:url']}
              style={{ margin: '10px', width: '300px' }}
            >
              <img
                style={{ width: '100%' }}
                src={metatags['twitter:image']}
                alt={metatags['twitter:title']}
              />
              <h4>{metatags['twitter:title']}</h4>
              {email && <p>Email: {email}</p>}
              <p>
                {expanded[metatags['og:url']]
                  ? description
                  : truncateDescription(description)}
                <span
                  style={{ color: 'blue', cursor: 'pointer' }}
                  onClick={() => toggleExpand(metatags['og:url'])}
                >
                  {expanded[metatags['og:url']] ? ' See less' : ' See more'}
                </span>
              </p>
            </div>
          ) : null;
        })}
    </div>
  );
};

export default ProfileCard;
