import React, { Component } from "react"
import PageTemplate from "./node_modules/components/page-template"
import CardList from "./node_modules/components/card-list"
import "./page1.css"

class Overview extends Component {
	render() {
		return (
			<PageTemplate pageHead="Card List">
				<CardList />
			</PageTemplate>
		)
	}
}

export default Overview
