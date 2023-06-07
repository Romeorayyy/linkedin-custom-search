// /Users/randyyono/Desktop/google-search-app/src/components/ProfileCard.js

import React from 'react';
import { useSearch } from '../context/SearchContext';

const ProfileCard = () => {
  const { metaData, emailsData } = useSearch();

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
              <p>{metatags['twitter:description'].replace(/<[^>]+>/g, '')}</p>
            </div>
          ) : null;
        })}
    </div>
  );
};

export default ProfileCard;
