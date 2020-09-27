import React from "react";
import Menu from "components/menu";
import "./header.css";

const Header = ({ pageHead }) => {
  return (
    <div className="header">
      <div className="container">
        <div className="header-container">
          <div className="title">{pageHead}</div>
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Header;
