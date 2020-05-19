import React, { Component } from "react"
import PageTemplate from "components/page-template"
import CardList from "components/card-list"
import "./overview.css"

class Overview extends Component {
	render() {
		return (
			<PageTemplate pageHead="Overview">
				<CardList />
			</PageTemplate>
		)
	}
}

export default Overview
