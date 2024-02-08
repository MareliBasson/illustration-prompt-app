import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HomePage } from 'pages/home/home.js'
import { Settings } from 'pages/art-prompter/settings/settings.js'
import { Calculator } from 'pages/calculator/index.js'
import { GlobalStyles } from 'styles/global-styles'
import { PageTemplate } from 'components/page-template'

const Routes = () => (
	<>
		<GlobalStyles />

		<Router>
			<PageTemplate pageHead=''>
				<React.Fragment>
					<Route exact path='/' component={HomePage} />
					<Route path='/settings' component={Settings} />
					<Route path='/calculator' component={Calculator} />
				</React.Fragment>
			</PageTemplate>
		</Router>
	</>
)

export default Routes
