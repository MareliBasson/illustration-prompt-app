import React, { Component } from 'react'
import PageTemplate from 'components/page-template'
import SettingsPrompts from 'components/settings-prompts'

class Settings extends Component {
	render() {
		return (
			<PageTemplate pageHead="">
				<SettingsPrompts />
			</PageTemplate>
		)
	}
}

export default Settings
