import React from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'

import styled, { css } from 'styled-components'
import { tokens } from 'styles/variables'

import { PromptCreate } from './prompt-create'
import { PromptUpdate } from './prompt-update'

export const SettingsPrompts = () => {
	const [prompts, setPrompts] = React.useState([])
	const [categories, setCategories] = React.useState([])
	const [editedList, setEditedList] = React.useState([])
	const [selectedPrompt, setSelectedPrompt] = React.useState({})
	const [showCreateForm, setShowCreateForm] = React.useState(false)
	const [showCreateBtn, setShowCreateBtn] = React.useState(true)

	React.useEffect(() => {
		const db = firebase.firestore()

		db.collection('prompts').onSnapshot((snapshot) => {
			const promptsData = []
			snapshot.forEach((doc) =>
				promptsData.push({ ...doc.data(), id: doc.id })
			)

			setPrompts(promptsData)
			setEditedList(_.sortBy(promptsData, ['category', 'description']))
		})

		db.collection('categories').onSnapshot((snapshot) => {
			const categoriesData = []
			snapshot.forEach((doc) => categoriesData.push(doc.data()))

			setCategories(_.sortBy(categoriesData, 'name'))
		})
	}, [])

	const selectPrompt = (prompt) => {
		if (_.isEmpty(selectedPrompt) || !_.isEqual(prompt, selectedPrompt)) {
			setSelectedPrompt(prompt)
			setShowCreateBtn(false)
			setShowCreateForm(false)
		}
	}

	const closeForm = () => {
		setSelectedPrompt({})
		setShowCreateBtn(true)
		setShowCreateForm(false)
	}

	const openCreateForm = () => {
		setShowCreateBtn(false)
		setShowCreateForm(true)
	}

	const handleSort = (prop) => {
		setEditedList(_.sortBy(editedList, prop))
	}

	const handleFilter = (e) => {
		setEditedList(
			e.target.value === 'all'
				? prompts
				: _.filter(prompts, ['category', e.target.value])
		)
	}

	return (
		<>
			<PromptList className='prompt-list'>
				<div className='column left'>
					<PromptFilters className='prompt-filters'>
						<div className='filter-section filtering'>
							Filter by category:{' '}
							<div className='select-wrapper'>
								<select
									name=''
									id=''
									onChange={(e) => handleFilter(e)}
								>
									<option value='all'>All Prompts</option>
									{categories.map((category) => (
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
						<div className='filter-section sorting'>
							Sort by:
							<div
								className='btn btn-primary btn-in-form'
								onClick={() => handleSort('description')}
							>
								Description
							</div>
							<div
								className='btn btn-primary btn-in-form'
								onClick={() =>
									handleSort(['category', 'description'])
								}
							>
								Category
							</div>
						</div>
					</PromptFilters>
					{editedList.map((prompt) => (
						<Prompt
							key={prompt.id}
							onClick={() => {
								selectPrompt(prompt)
							}}
							$selected={_.isEqual(prompt, selectedPrompt)}
						>
							<div className='description'>
								{prompt.description}
							</div>
							{/* <div className="image">{prompt.imageUrl && <i className="fa fa-file-image-o"></i>}</div> */}
							<div className='category'>{prompt.category}</div>
						</Prompt>
					))}
				</div>
				<div className='column right'>
					<PromptActions className='prompt-actions'>
						{showCreateBtn && (
							<CreatePromptButton
								onClick={() => {
									openCreateForm()
								}}
								className='btn-create-prompt'
							>
								<i className='fa fa-plus'></i>
								<h3>Create Prompt</h3>
							</CreatePromptButton>
						)}

						{showCreateForm && (
							<PromptCreate closeForm={closeForm} />
						)}

						{!_.isEmpty(selectedPrompt) && (
							<PromptUpdate
								prompt={selectedPrompt}
								closeForm={closeForm}
							/>
						)}
					</PromptActions>
				</div>
			</PromptList>
		</>
	)
}

const PromptList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 60px;

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column-reverse;
	}
`
const PromptFilters = styled.div`
	margin-bottom: 40px;
	display: grid;
	grid-template-columns: auto auto;
	column-gap: 20px;

	@media (max-width: 992px) {
		grid-template-columns: 1fr;
		row-gap: 20px;
	}

	.btn,
	.select-wrapper {
		margin-left: 10px;
	}
`
const Prompt = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr 50px;
	padding: 10px 10px;
	cursor: pointer;

	.category {
		text-align: right;
	}

	.options {
		opacity: 0;
		text-align: right;

		@media (max-width: 768px) {
			opacity: 1;
		}
	}

	${(props) =>
		props.$selected &&
		css`
			background-color: rgba(${tokens.colorGreen}, 0.3);

			.options {
				opacity: 1;
			}
		`}

	&:hover {
		background-color: rgba(${tokens.colorGreen}, 0.3);

		.options {
			opacity: 1;
		}
	}
`
const PromptActions = styled.div`
	position: sticky;
	top: 20px;
`
const CreatePromptButton = styled.div`
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
