import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HomePage } from 'pages/home.js'
import { Settings } from 'pages/settings.js'

const Routes = () => (
	<Router>
		<React.Fragment>
			<Route exact path="/" component={HomePage} />
			<Route path="/settings" component={Settings} />
		</React.Fragment>
	</Router>
)

export default Routes
