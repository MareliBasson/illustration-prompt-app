import React from "react";
import Header from "components/header";
import "./page-template.css";

const PageTemplate = ({ children, pageHead }) => {
  return (
    <div className="page">
      <Header heading={pageHead} />

      <div className="content">
        <div className="container">
          {/* <h1>{pageHead}</h1> */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageTemplate;
