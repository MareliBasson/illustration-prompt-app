import React from 'react'

import styled from 'styled-components'
import { tokens } from 'styles/tokens'

export const CreateButton = ({ label, onClick }) => {
	return (
		<CreateButtonWrapper
			onClick={() => {
				onClick()
			}}
		>
			<i className='fa fa-plus'></i>
			<h3>Create {label}</h3>
		</CreateButtonWrapper>
	)
}

const CreateButtonWrapper = styled.div`
	border: 2px solid ${tokens.colorGreen};
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	text-align: center;
	height: 150px;
	box-sizing: border-box;
	margin-bottom: 20px;

	i {
		margin-bottom: 10px;
		font-size: 40px;
	}

	&:hover {
		background-color: rgba(${tokens.colorGreen}, 0.3);
	}

	@media (max-width: 768px) {
		flex-direction: row;
		height: auto;
		padding: 10px;

		h3 {
			line-height: 1.3em;
		}
		i {
			margin: 0px 10px 0px 0px;
			font-size: 20px;
		}
	}
`
