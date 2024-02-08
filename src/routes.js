import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { PromptSelector } from 'apps/art-prompter/selector/prompt-selector.js'
import { Settings } from 'apps/art-prompter/settings/settings.js'
import { Calculator } from 'apps/paper-calculator/calculator.js'
import { GlobalStyles } from 'styles/global-styles'
import { PageTemplate } from 'components/page-template'

const Routes = () => (
	<>
		<GlobalStyles />

		<Router>
			<PageTemplate>
				<React.Fragment>
					<Route exact path='/' component={PromptSelector} />
					<Route path='/settings' component={Settings} />
					<Route path='/calculator' component={Calculator} />
				</React.Fragment>
			</PageTemplate>
		</Router>
	</>
)

export default Routes
