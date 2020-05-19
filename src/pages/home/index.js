import React, { Component } from "react"
import PageTemplate from "components/page-template"
import CardList from "components/card-list"
import "./home.css"

class HomePage extends Component {
	render() {
		return (
			<PageTemplate pageHead="Home Page">
				<CardList />
			</PageTemplate>
		)
	}
}

export default HomePage
