import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import PageTemplate from 'components/page-template'
import SettingsPrompts from 'components/settings-prompts'
import SettingsTypes from 'components/settings-types'
import { tokens } from 'styles/variables'

const Settings = () => {
	const screens = ['prompts', 'types']
	const [settingsScreen, setSettingsScreen] = React.useState('types')

	return (
		<PageTemplate pageHead="">
			<ScreenSwitcher>
				{screens.map((screen) => {
					return (
						<Switch onClick={() => setSettingsScreen(screen)} $selected={settingsScreen === screen}>
							{_.capitalize(screen)}
						</Switch>
					)
				})}
			</ScreenSwitcher>

			{settingsScreen === 'prompts' && <SettingsPrompts />}
			{settingsScreen === 'types' && <SettingsTypes />}
		</PageTemplate>
	)
}

export default Settings

const ScreenSwitcher = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 60px;
`
const Switch = styled.button`
	background: none;
	border: none;
	color: white;
	padding: 0px 10px 20px;
	margin: 0 20px;
	cursor: pointer;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: ${(props) => (props.$selected ? tokens.colorRed : 'rgba(250, 250, 250, 0.2)')};

	&:hover {
		border-color: white;
	}
`