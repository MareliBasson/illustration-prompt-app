import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import HomePage from "pages/home"
import Overview from "pages/overview"
import PageTwo from "pages/page2"

const Routes = () => (
	<Router>
		<React.Fragment>
			<Route exact path="/" component={HomePage} />
			<Route path="/card-list" component={Overview} />
			<Route path="/page2" component={PageTwo} />
		</React.Fragment>
	</Router>
)

export default Routes
