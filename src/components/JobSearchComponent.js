import React, { useState } from 'react';

const JobSearchComponent = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [locationKeywords, setLocationKeywords] = useState('');
  const [emailOption, setEmailOption] = useState('@gmail.com');
  const [output, setOutput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedJobTitle = `${formatKeywords(jobTitle)}`;
    const formattedLocationKeywords = `${formatKeywords(locationKeywords)}`;

    const outputText = `${formattedJobTitle} ${formattedLocationKeywords} -intitle:"profiles" -inurl:"dir/ " email "${emailOption}" site:www.linkedin.com/in/ OR site:www.linkedin.com/pub/`;
    setOutput(outputText);
  };

  const formatKeywords = (keywords) => {
    return keywords
      .split(/\b(and|or)\b/i)
      .map((keyword) =>
        keyword.trim() === 'and' || keyword.trim() === 'or'
          ? keyword.trim().toUpperCase()
          : `"${keyword.trim()}"`
      )
      .join(' ');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="locationKeywords">
            Location or Keywords to Include:
          </label>
          <input
            type="text"
            id="locationKeywords"
            value={locationKeywords}
            onChange={(e) => setLocationKeywords(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <div>
            <input
              type="radio"
              id="gmail"
              name="emailOption"
              value="@gmail.com"
              checked={emailOption === '@gmail.com'}
              onChange={() => setEmailOption('@gmail.com')}
            />
            <label htmlFor="gmail">@gmail.com</label>
          </div>
          <div>
            <input
              type="radio"
              id="yahoo"
              name="emailOption"
              value="@yahoo.com"
              checked={emailOption === '@yahoo.com'}
              onChange={() => setEmailOption('@yahoo.com')}
            />
            <label htmlFor="yahoo">@yahoo.com</label>
          </div>
          <div>
            <input
              type="radio"
              id="outlook"
              name="emailOption"
              value="@outlook.com"
              checked={emailOption === '@outlook.com'}
              onChange={() => setEmailOption('@outlook.com')}
            />
            <label htmlFor="outlook">@outlook.com</label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      {output && <h3>{output}</h3>}
    </div>
  );
};

export default JobSearchComponent;
