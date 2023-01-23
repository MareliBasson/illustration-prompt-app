import React from 'react'
import _ from 'lodash'

import styled from 'styled-components'
import { tokens } from 'styles/tokens'

import { PageTemplate } from 'pages/components/page-template'
import { SettingsPrompts } from './prompt-settings'
import { SettingsCategories } from './category-settings'
import { PasswordModal } from './password-overlay'

export const Settings = () => {
	const screens = ['prompts', 'categories']
	const [settingsScreen, setSettingsScreen] = React.useState('categories')
	const [showPassword, setShowPassword] = React.useState(true)

	return (
		<PageTemplate pageHead=''>
			<ScreenSwitcher>
				{screens.map((screen, index) => {
					return (
						<Switch
							key={screen + '-' + index}
							onClick={() => setSettingsScreen(screen)}
							$selected={settingsScreen === screen}
						>
							{_.capitalize(screen)}
						</Switch>
					)
				})}
			</ScreenSwitcher>

			{settingsScreen === 'prompts' && <SettingsPrompts />}
			{settingsScreen === 'categories' && <SettingsCategories />}

			{showPassword && (
				<PasswordModal
					hideModal={() => setShowPassword(false)}
				></PasswordModal>
			)}
		</PageTemplate>
	)
}

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
	border-bottom-color: ${(props) =>
		props.$selected ? tokens.colorRed : 'rgba(250, 250, 250, 0.2)'};

	&:hover {
		border-color: white;
	}
`
