import React from 'react'
import _ from 'lodash'

import styled from 'styled-components'
import { tokens } from 'styles/variables'

export const PasswordModal = ({ hideModal }) => {
	return (
		<PasswordOverlay>
			<Modal>
				<ModalContent>
					Password:
					<input
						type='password'
						autoFocus
						onChange={(e) => {
							const value = e.target.value
							const password = process.env.REACT_APP_PASSWORD

							if (value === password) {
								hideModal()
							}
						}}
					/>
				</ModalContent>
			</Modal>
		</PasswordOverlay>
	)
}

const PasswordOverlay = styled.div`
	position: fixed;
	overflow: hidden;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: ${tokens.zPasswordOverlay};
`
const Modal = styled.div`
	width: 240px;
	background-color: ${tokens.colorCyan};
	padding: 20px 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 2px;
`
const ModalContent = styled.div`
	text-align: center;
	input {
		width: 100%;
		margin-top: 20px;
		border: none;
		border-radius: 4px;
		padding: 10px;
		text-align: center;
	}
`
