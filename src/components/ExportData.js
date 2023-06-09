import React from 'react';
import { useSearch } from '../context/SearchContext';
import exportFromJSON from 'export-from-json';

const ExportData = () => {
  const { metaData, emailsData, selectedProfiles } = useSearch();

  const getEmailFromUrl = (url) => {
    const emailData = emailsData.find((item) => item.ogUrl === url);
    return emailData ? emailData.email : null;
  };

  const handleExport = () => {
    // Filter metadata to include only selected profiles
    const dataToExport = metaData
      .filter((metatags) => selectedProfiles.includes(metatags['og:url']))
      .map((metatags) => {
        const email = getEmailFromUrl(metatags['og:url']);
        return {
          'First Name': metatags['profile:first_name'],
          'Last Name': metatags['profile:last_name'],
          Email: email,
          'Linkedin Title': metatags['twitter:title'],
          Description: metatags['twitter:description'],
          URL: metatags['og:url'],
        };
      });

    exportFromJSON({
      data: dataToExport,
      fileName: 'export',
      exportType: 'csv',
    });
  };

  return (
    <button onClick={handleExport} disabled={selectedProfiles.length === 0}>
      Export data
    </button>
  );
};

export default ExportData;
