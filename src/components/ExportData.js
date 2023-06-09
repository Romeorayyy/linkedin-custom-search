import React, { useState } from 'react';
import { useSearch } from '../context/SearchContext';
import * as XLSX from 'xlsx';
import exportFromJSON from 'export-from-json';
import { saveAs } from 'file-saver';

const ExportData = () => {
  const { metaData, emailsData, selectedProfiles } = useSearch();
  const [exportType, setExportType] = useState('csv');

  const getEmailFromUrl = (url) => {
    const emailData = emailsData.find((item) => item.ogUrl === url);
    return emailData ? emailData.email : null;
  };

  const handleExport = () => {
    const dataToExport = metaData
      .filter((metatags) => selectedProfiles.includes(metatags['og:url']))
      .map((metatags) => {
        const email = getEmailFromUrl(metatags['og:url']);
        return {
          'First Name': metatags['profile:first_name'],
          'Last Name': metatags['profile:last_name'],
          Email: email,
          Title: metatags['twitter:title'],
          Description: metatags['twitter:description'],
          URL: metatags['og:url'],
        };
      });

    if (exportType === 'csv') {
      exportFromJSON({
        data: dataToExport,
        fileName: 'export',
        exportType: exportFromJSON.types.csv,
      });
    } else if (exportType === 'xlsx') {
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      const data = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      });
      saveAs(data, 'export.xlsx');
    }
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="csv"
          checked={exportType === 'csv'}
          onChange={(e) => setExportType(e.target.value)}
        />
        CSV
      </label>
      <label>
        <input
          type="radio"
          value="xlsx"
          checked={exportType === 'xlsx'}
          onChange={(e) => setExportType(e.target.value)}
        />
        Excel
      </label>
      <button onClick={handleExport} disabled={selectedProfiles.length === 0}>
        Export data
      </button>
    </div>
  );
};

export default ExportData;
