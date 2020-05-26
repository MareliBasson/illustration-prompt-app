import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import "./menu.css"

class Menu extends Component {
	render() {
		return (
			<div className="menu">
				<NavLink activeClassName="active" exact to="/">
					<i className="fa fa-home"></i>
				</NavLink>
				<NavLink activeClassName="active" to="/overview">
					<i className="fa fa-cog"></i>
				</NavLink>
			</div>
		)
	}
}

export default Menu
