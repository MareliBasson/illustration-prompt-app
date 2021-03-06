import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from 'pages/home.js'
import Settings from 'pages/settings.js'
import TypeSettings from 'pages/type-settings.js'

const Routes = () => (
	<Router>
		<React.Fragment>
			<Route exact path="/" component={HomePage} />
			<Route path="/settings" component={Settings} />
			<Route path="/type-settings" component={TypeSettings} />
		</React.Fragment>
	</Router>
)

export default Routes
