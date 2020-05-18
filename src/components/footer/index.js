import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="footer__container">
                        <div className="footer__col">Footer Column</div>
                        <div className="footer__col">Footer Column</div>
                        <div className="footer__col">Footer Column</div>
                        <div className="footer__col">Footer Column</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
