import React from 'react'
import _ from 'lodash'
import { firebase } from 'firebaseConfig'

import { CategoryForm } from 'pages/settings/category-form'

export const CategoryUpdate = ({ category, closeForm }) => {
	const [prompts, setPrompts] = React.useState([])

	React.useEffect(() => {
		const db = firebase.firestore()

		db.collection('prompts').onSnapshot((snapshot) => {
			const promptsData = []
			snapshot.forEach((doc) =>
				promptsData.push({ ...doc.data(), id: doc.id })
			)

			if (_.isEmpty(prompts)) {
				setPrompts(promptsData)
			}
		})
	})

	const [name, setName] = React.useState('')
	const [title, setTitle] = React.useState('')
	const [color, setColor] = React.useState('')
	const [visible, setVisible] = React.useState()

	React.useEffect(() => {
		updateCategory()
	}, [category])

	const updateCategory = () => {
		setName(category.name)
		setTitle(category.title)
		setColor(category.color)
		setVisible(category.visible)
	}

	const onDelete = (e, categoryId) => {
		e.stopPropagation()
		if (
			window.confirm(
				'Are you sure you want to delete this category?\nIt will delete all prompts in this category as well.'
			)
		) {
			const db = firebase.firestore()

			//Delete the category
			db.collection('categories').doc(categoryId).delete()

			//Delete the associated prompts
			const promptsToDelete = prompts.filter(
				(prompt) => prompt.category === category.name
			)
			for (var i = 0; i < promptsToDelete.length; i++) {
				db.collection('prompts').doc(promptsToDelete[i].id).delete()
			}
		}
	}

	const handleSubmit = (categoryId) => {
		const db = firebase.firestore()
		db.collection('categories')
			.doc(categoryId)
			.set({ ...category, name, color, title, visible })

		setName('')
		setTitle('')
		setColor('')
		setVisible(true)

		closeForm()
	}

	const haveChanged =
		name === category.name &&
		color === category.color &&
		title === category.title &&
		visible === category.visible

	return (
		<CategoryForm
			formName='Edit selected category'
			closeForm={closeForm}
			nameVal={name}
			colorVal={color}
			titleVal={title}
			visibleVal={visible}
			setTitle={setTitle}
			setName={setName}
			setColor={setColor}
			setVisible={setVisible}
			onPrimarySubmit={() => handleSubmit(category.id)}
			disablePrimary={haveChanged}
			primaryBtnLabel='Apply Changes'
			onSecondarySubmit={(e) => onDelete(e, category.id)}
			secondaryBtnLabel='Delete category'
		/>
	)
}
