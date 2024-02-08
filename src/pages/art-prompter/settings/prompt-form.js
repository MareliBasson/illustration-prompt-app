import React from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'

import styled from 'styled-components'
import { tokens } from 'styles/tokens'

// import ImageUploader from 'pages/components/image-uploader'

export const PromptForm = ({
	formName,
	closeForm,
	descriptionVal,
	categoryVal,
	setValue,
	onPrimarySubmit,
	disablePrimary,
	primaryBtnLabel,
	onSecondarySubmit,
	disableSecondary,
	secondaryBtnLabel,
	// imageUrl,
}) => {
	const [categories, setCategories] = React.useState()

	React.useEffect(() => {
		const db = firebase.firestore()

		db.collection('categories').onSnapshot((snapshot) => {
			const categoriesData = []
			snapshot.forEach((doc) => categoriesData.push(doc.data()))

			setCategories(_.sortBy(categoriesData, 'name'))
		})
	})

	return (
		<PromptFormWrapper className='prompt-form-container'>
			<Form className='prompt-form'>
				<FormHeading className='form-heading'>
					<h3>{formName}</h3>
					<button
						onClick={() => closeForm()}
						className='btn btn-icon'
					>
						<i className='fa fa-times'></i>
					</button>
				</FormHeading>
				<FormFields className='form-fields'>
					<div className='description'>
						<h4>Description:</h4>
						<input
							type='text'
							value={descriptionVal}
							onChange={(e) => {
								setValue('description', e.target.value)
							}}
							placeholder='Description'
						/>
					</div>
					<div className='category'>
						<h4>Category:</h4>
						<div className='select-wrapper'>
							<select
								name='category'
								id=''
								onChange={(e) => {
									setValue('category', e.target.value)
								}}
								value={categoryVal}
							>
								<option value='default'>Select category</option>
								{categories?.map((category) => (
									<option
										key={category.name}
										value={category.name}
									>
										{category.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</FormFields>

				{/* <ImageUploader setValue={setValue} imageUrl={imageUrl} /> */}

				<FormButtons className='form-btns'>
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
				</FormButtons>
			</Form>
		</PromptFormWrapper>
	)
}

const PromptFormWrapper = styled.div`
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
const Form = styled.div`
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
const FormButtons = styled.div`
	text-align: right;

	> * {
		margin-left: 10px;
	}
`
// .prompt-form-container {
// 	.prompt-form {
// 		.form-heading {
// 		}
// 		.form-fields {
// 		}
// .form-btns {
// 		}
// 	}

// }
