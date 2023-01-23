import styled from 'styled-components'
import { tokens } from 'styles/tokens'

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

export const Container = styled.div`
	margin: 0 auto;
	@media (min-width: 768px) {
		width: 740px;
	}
	@media (min-width: 992px) {
		width: 950px;
	}
	@media (min-width: 1200px) {
		width: 1150px;
	}
`
