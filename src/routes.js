import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import HomePage from "pages/home"
import Overview from "pages/overview"

const Routes = () => (
	<Router>
		<React.Fragment>
			<Route exact path="/" component={HomePage} />
			<Route path="/overview" component={Overview} />
		</React.Fragment>
	</Router>
)

export default Routes
