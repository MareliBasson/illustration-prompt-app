import styled from 'styled-components'
import { tokens } from 'styles/variables'

// ** Settings **

export const SettingsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 60px;

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column-reverse;
	}
`

export const SettingsActions = styled.div`
	position: sticky;
	top: 20px;
`
