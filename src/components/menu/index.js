import React from 'react'
import { NavLink } from 'react-router-dom'
import './menu.css'

const Menu = () => {
	return (
		<div className="menu">
			<NavLink activeClassName="active" exact to="/">
				<i className="fa fa-home"></i>
			</NavLink>

			<NavLink activeClassName="active" to="/settings">
				<i className="fa fa-cog"></i>
			</NavLink>

			<NavLink activeClassName="active" to="/type-settings">
				<i className="fa fa-cog"></i>
			</NavLink>
		</div>
	)
}

export default Menu
