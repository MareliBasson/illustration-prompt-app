import React from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'

import styled from 'styled-components'
import { tokens } from 'styles/variables'

export const CategoryForm = ({
	formName,
	closeForm,
	nameVal,
	titleVal,
	colorVal,
	visibleVal,
	setTitle,
	setName,
	setColor,
	setVisible,
	onPrimarySubmit,
	disablePrimary,
	primaryBtnLabel,
	onSecondarySubmit,
	disableSecondary,
	secondaryBtnLabel,
}) => {
	const [colors, setColors] = React.useState([])

	React.useEffect(() => {
		const db = firebase.firestore()

		db.collection('colors').onSnapshot((snapshot) => {
			const colorsData = []
			snapshot.forEach((doc) => colorsData.push(doc.data()))

			if (_.isEmpty(colors)) {
				setColors(colorsData)
			}
		})
	})

	return (
		<CategoryFormContainer>
			<CategoryFormWrapper>
				<FormHeading>
					<h3>{formName}</h3>
					<button
						onClick={() => closeForm()}
						className='btn btn-icon'
					>
						<i className='fa fa-times'></i>
					</button>
				</FormHeading>
				<FormFields>
					<div>
						<h4>Name:</h4>
						<input
							type='text'
							value={nameVal}
							onChange={(e) => {
								setName(e.target.value)
							}}
							placeholder='name'
						/>
					</div>
					<div>
						<h4>Label:</h4>
						<input
							type='text'
							value={titleVal}
							onChange={(e) => {
								setTitle(e.target.value)
							}}
							placeholder='Label'
						/>
					</div>
					<div>
						<h4>Color:</h4>
						<div className='select-wrapper'>
							<select
								name='color'
								id=''
								onChange={(e) => {
									setColor(e.target.value)
								}}
								value={colorVal}
							>
								<option value='default'>Select color</option>
								{colors?.map((color, index) => (
									<option
										key={`${color.name}-${index}`}
										value={color.name}
									>
										{color.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div>
						<h4>Visible:</h4>
						<input
							name='visible'
							type='checkbox'
							checked={visibleVal}
							onChange={(e) => {
								setVisible(e.target.checked)
							}}
						/>
					</div>
				</FormFields>

				<FormBtns>
					{secondaryBtnLabel && (
						<button
							onClick={(e) => {
								onSecondarySubmit(e)
								closeForm()
							}}
							className='btn btn-destruct'
							disabled={disableSecondary}
						>
							{secondaryBtnLabel}
						</button>
					)}
					<button
						onClick={() => {
							onPrimarySubmit()
						}}
						className='btn btn-confirm'
						disabled={disablePrimary}
					>
						{primaryBtnLabel}
					</button>
				</FormBtns>
			</CategoryFormWrapper>
		</CategoryFormContainer>
	)
}

const CategoryFormContainer = styled.div`
	position: relative;
	z-index: ${tokens.zPromptForm};

	@media (max-width: 768px) {
		position: fixed;
		background-color: rgba(0, 0, 0, 0.7);
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`
const CategoryFormWrapper = styled.div`
	width: 100%;
	height: ${tokens.actionHeight};
	max-height: 90vh;
	overflow-x: scroll;
	padding: 10px 20px;
	border: 2px solid ${tokens.colorGreen};
	border-radius: 5px;
	background-color: ${tokens.colorPrimary};
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media (max-width: 768px) {
		height: auto;
		max-width: 80%;
		padding: 20px;
	}
`
const FormHeading = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`
const FormFields = styled.div`
	border-bottom: 1px solid rgba(255, 255, 255, 0.3);
	margin-bottom: 15px;

	> * {
		display: grid;
		grid-template-columns: 1fr 2fr;
		margin-bottom: 15px;
		align-items: center;
	}

	@media (max-width: 560px) {
		grid-template-columns: 1fr;

		input {
			margin-bottom: 10px;
		}
	}
`
const FormBtns = styled.div`
	text-align: right;

	> * {
		margin-left: 10px;
	}
`
