import React, { Component } from "react";
import PageTemplate from "components/page-template";
import "./page2.css";

class PageTwo extends Component {
  render() {
    return (
      <PageTemplate pageHead="Page 2">
        <p>Some text goes here</p>
      </PageTemplate>
    );
  }
}

export default PageTwo;
