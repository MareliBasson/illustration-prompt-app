import React, { Component } from "react"
import Menu from "components/menu"
import "./header.css"

class Header extends Component {
	render() {
		return (
			<div className="header">
				<div className="container">
					<div className="header-container">
						<div className="title">{this.props.heading}</div>
						<Menu />
					</div>
				</div>
			</div>
		)
	}
}

export default Header
