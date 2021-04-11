import React from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'

import styled, { css } from 'styled-components'
import { tokens } from 'styles/variables'

import { CategoryCreate } from './category-create'
import { CategoryUpdate } from './category-update'

export const SettingsCategories = () => {
	const [categories, setCategories] = React.useState([])
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
		setCategories(_.sortBy(categories, prop))
	}

	return (
		<>
			<CategoryList>
				<div className='column left'>
					<CategoryFilters>
						<div className='sorting'>
							Sort by:
							<div
								className='btn btn-primary btn-in-form'
								onClick={() => handleSort('title')}
							>
								Title
							</div>
							<div
								className='btn btn-primary btn-in-form'
								onClick={() => handleSort('name')}
							>
								Name
							</div>
							<div
								className='btn btn-primary btn-in-form'
								onClick={() => handleSort('color')}
							>
								Color
							</div>
						</div>
					</CategoryFilters>
					{categories.map((category) => {
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
								<div className='color'>
									{category.color}{' '}
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
					<CategoryActions className='category-actions'>
						{showCreateBtn && (
							<CreateCategoryButton
								onClick={() => {
									openCreateForm()
								}}
								className='btn-create-category'
							>
								<i className='fa fa-plus'></i>
								<h3>Create Category</h3>
							</CreateCategoryButton>
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
					</CategoryActions>
				</div>
			</CategoryList>
		</>
	)
}

const CategoryList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 60px;

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column-reverse;
	}
`
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
	grid-template-columns: 2fr 1fr 1fr;
	padding: 10px 10px;
	cursor: pointer;

	.title {
		white-space: nowrap;
	}

	.name {
		white-space: nowrap;
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
		background-color: rgba(${tokens.colorGreen}, 0.3);
	}

	${(props) =>
		props.$selected &&
		css`
			background-color: rgba(${tokens.colorGreen}, 0.3);
		`}
`
const CategoryActions = styled.div`
	position: sticky;
	top: 20px;
`
const CreateCategoryButton = styled.div`
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
