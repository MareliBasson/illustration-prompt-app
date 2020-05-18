import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './menu.css';

class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <NavLink activeClassName="active" exact to="/">
                    Home
                </NavLink>
                <NavLink activeClassName="active" to="/page1">
                    Page 1
                </NavLink>
                <NavLink activeClassName="active" to="/page2">
                    Page 2
                </NavLink>
            </div>
        );
    }
}

export default Menu;
