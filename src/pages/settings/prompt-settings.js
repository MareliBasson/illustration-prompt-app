import React from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'

import styled, { css } from 'styled-components'

import { PromptCreate } from './prompt-create'
import { PromptUpdate } from './prompt-update'
import { CreateButton } from './create-button'
import { SettingsList, SettingsActions } from 'styles/styles'

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
			<SettingsList>
				<div className='column left'>
					<PromptFilters>
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
					<SettingsActions>
						{showCreateBtn && (
							<CreateButton
								onClick={() => {
									openCreateForm()
								}}
								label='Prompt'
							/>
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
					</SettingsActions>
				</div>
			</SettingsList>
		</>
	)
}

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
			background-color: rgba(0, 0, 0, 0.3);

			.options {
				opacity: 1;
			}
		`}

	&:hover {
		background-color: rgba(0, 0, 0, 0.3);

		.options {
			opacity: 1;
		}
	}
`
