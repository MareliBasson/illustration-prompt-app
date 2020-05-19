import React, { Component } from "react"
import PageTemplate from "components/page-template"
import PromptSelector from "components/prompt-selector"
import "./home.css"

class HomePage extends Component {
	render() {
		return (
			<PageTemplate pageHead="Home Page">
				<PromptSelector />
			</PageTemplate>
		)
	}
}

export default HomePage
