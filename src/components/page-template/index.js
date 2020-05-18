import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Footer from 'components/footer';
import './page-template.css';

class PageTemplate extends Component {
    render() {
        const { children } = this.props;
        const pageHead = this.props.pageHead;

        return (
            <div className="page">
                <Header />
                <div className="content">
                    <div className="container">
                        <h1>{pageHead}</h1>
                        {children}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

PageTemplate.propTypes = {
    children: PropTypes.any,
    pageHead: PropTypes.string
};

export default PageTemplate;
