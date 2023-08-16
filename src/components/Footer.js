import React from 'react';

function Footer() {
  return (
    <div>
      <div
        className="d-flex justify-content-center bg-dark py-3"
        style={{ width: '100%' }}
      >
        <a
          className="btn btn-primary btn-floating m-1"
          href="https://www.linkedin.com/in/randyyono/"
          target="_blank"
          rel="noopener noreferrer"
          role="button"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a
          className="btn btn-dark btn-floating m-1"
          href="https://github.com/Romeorayyy"
          target="_blank"
          rel="noopener noreferrer"
          role="button"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
      <div className="bg-dark py-3 text-center">
        <span className="text-light">Created by </span>
        <a
          href="https://www.randyyono.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Randy Yono
        </a>
      </div>
    </div>
  );
}

export default Footer;
