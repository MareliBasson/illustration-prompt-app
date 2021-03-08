import React from 'react'
import _ from 'lodash'
import PageTemplate from 'components/page-template'
import SettingsPrompts from 'components/settings-prompts'
import SettingsTypes from 'components/settings-types'
import './settings.css'

const Settings = () => {
	const screens = ['prompts', 'types']
	const [settingsScreen, setSettingsScreen] = React.useState('types')

	return (
		<PageTemplate pageHead="">
			<div className="screen-switcher">
				{screens.map((screen) => {
					return (
						<button
							onClick={() => setSettingsScreen(screen)}
							className={`${settingsScreen === screen && 'selected'}`}
						>
							{_.capitalize(screen)}
						</button>
					)
				})}
			</div>
			{settingsScreen === 'prompts' && <SettingsPrompts />}
			{settingsScreen === 'types' && <SettingsTypes />}
		</PageTemplate>
	)
}

export default Settings
