import React from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'

import styled, { css } from 'styled-components'

import { CategoryCreate } from './category-create'
import { CategoryUpdate } from './category-update'
import { CreateButton } from './create-button'
import { SettingsList, SettingsActions } from 'styles/styles'

export const SettingsCategories = () => {
	const [categories, setCategories] = React.useState([])
	const [editedList, setEditedList] = React.useState([])
	const [colors, setColors] = React.useState([])
	const [selectedCategory, setSelectedCategory] = React.useState({})
	const [showCreateForm, setShowCreateForm] = React.useState(false)
	const [showCreateBtn, setShowCreateBtn] = React.useState(true)

	React.useEffect(() => {
		const db = firebase.firestore()

		db.collection('categories').onSnapshot((snapshot) => {
			const categoriesData = []
			snapshot.forEach((doc) =>
				categoriesData.push({ ...doc.data(), id: doc.id })
			)

			setCategories(categoriesData)
			setEditedList(categoriesData)
		})

		db.collection('colors').onSnapshot((snapshot) => {
			const colorsData = []
			snapshot.forEach((doc) => colorsData.push(doc.data()))

			setColors(_.sortBy(colorsData, 'title'))
		})
	}, [])

	const selectCategory = (category) => {
		if (
			_.isEmpty(selectedCategory) ||
			!_.isEqual(category, selectedCategory)
		) {
			setSelectedCategory(category)
			setShowCreateBtn(false)
			setShowCreateForm(false)
		}
	}

	const closeForm = () => {
		setSelectedCategory({})
		setShowCreateBtn(true)
		setShowCreateForm(false)
	}

	const openCreateForm = () => {
		setShowCreateBtn(false)
		setShowCreateForm(true)
	}

	const handleSort = (prop) => {
		setEditedList(_.sortBy(categories, prop))
	}

	const clearSort = () => {
		setEditedList(categories)
	}

	const SortOptions = ['title', 'name']

	return (
		<>
			<SettingsList>
				<div className='column left'>
					<CategoryFilters>
						<div className='sorting'>
							<button onClick={() => handleSort('title')}>
								Sort alphabetically
							</button>
						</div>
						<button onClick={clearSort}>Clear sorting</button>
					</CategoryFilters>
					{editedList.map((category) => {
						const colorObj = _.find(
							colors,
							(color) => color.name === category.color
						)

						return (
							<Category
								key={category.id}
								$selected={_.isEqual(
									category,
									selectedCategory
								)}
								onClick={() => {
									selectCategory(category)
								}}
							>
								<div className='title'>{category.title}</div>
								<div className='name'>{category.name}</div>
								<div className='visible'>
									{!category.visible && (
										<i className={`fa fa-times`} />
									)}
								</div>
								<div className='color'>
									<span
										style={{
											backgroundColor: colorObj?.value,
										}}
									></span>
								</div>
							</Category>
						)
					})}
				</div>
				<div className='column right'>
					<SettingsActions>
						{showCreateBtn && (
							<CreateButton
								onClick={() => {
									openCreateForm()
								}}
								label='Category'
							/>
						)}

						{showCreateForm && (
							<CategoryCreate closeForm={closeForm} />
						)}

						{!_.isEmpty(selectedCategory) && (
							<CategoryUpdate
								category={selectedCategory}
								closeForm={closeForm}
							/>
						)}
					</SettingsActions>
				</div>
			</SettingsList>
		</>
	)
}

const CategoryFilters = styled.div`
	margin-bottom: 40px;
	display: grid;
	grid-template-columns: auto auto;
	column-gap: 20px;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		row-gap: 20px;
	}

	.btn,
	.select-wrapper {
		margin-left: 10px;
	}
`
const Category = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr 1fr 1fr;
	padding: 10px 10px;
	cursor: pointer;

	.title {
		white-space: nowrap;
	}

	.name {
		white-space: nowrap;
	}

	.visible {
		text-align: right;
	}

	.color {
		white-space: nowrap;
		display: flex;
		justify-content: flex-end;
		align-items: center;

		span {
			display: inline-block;
			min-width: 20px;
			min-height: 20px;
			border-radius: 100%;
			margin-left: 10px;
			flex: 0;
		}
	}

	&:hover {
		background-color: rgba(0, 0, 0, 0.3);
	}

	${(props) =>
		props.$selected &&
		css`
			background-color: rgba(0, 0, 0, 0.3);
		`}
`
