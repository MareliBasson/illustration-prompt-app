import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import "./menu.css"

class Menu extends Component {
	render() {
		return (
			<div className="menu">
				<NavLink activeClassName="active" exact to="/">
					Home
				</NavLink>
				<NavLink activeClassName="active" to="/overview">
					All Prompts
				</NavLink>
			</div>
		)
	}
}

export default Menu
