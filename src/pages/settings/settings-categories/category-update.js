import React, { useEffect, useState, useCallback, useRef } from 'react'
import _ from 'lodash'
import { firebase } from 'firebaseConfig'
import CategoryForm from 'pages/settings/settings-categories/category-form'

const CategoryUpdate = ({ category, closeForm }) => {
	const [name, setName] = useState('')
	const [title, setTitle] = useState('')
	const [color, setColor] = useState('')

	const usePrevious = (value) => {
		const ref = useRef()
		useEffect(() => {
			ref.current = value
		})
		return ref.current
	}

	const prevCategory = usePrevious(category)

	const updateCategory = useCallback(() => {
		if (!_.isEqual(prevCategory, category)) {
			setName(category.name)
			setTitle(category.title)
			setColor(category.color)
		} else {
			setName(name)
			setTitle(title)
			setColor(color)
		}
	}, [category, prevCategory, name, title, color])

	useEffect(() => {
		updateCategory()
	}, [updateCategory])

	const onDelete = (e, categoryId) => {
		e.stopPropagation()
		if (window.confirm('Are you sure you want to delete this category?')) {
			const db = firebase.firestore()
			db.collection('categories').doc(categoryId).delete()
		}
	}

	const handleSubmit = (categoryId) => {
		const db = firebase.firestore()
		db.collection('categories')
			.doc(categoryId)
			.set({ ...category, name, color, title })

		setName('')
		setTitle('')
		setColor('')

		closeForm()
	}

	const haveChanged =
		name === category.name &&
		color === category.color &&
		title === category.title

	return (
		<CategoryForm
			formName='Edit selected category'
			closeForm={closeForm}
			nameVal={name}
			colorVal={color}
			titleVal={title}
			setTitle={setTitle}
			setName={setName}
			setColor={setColor}
			onPrimarySubmit={() => handleSubmit(category.id)}
			disablePrimary={haveChanged}
			primaryBtnLabel='Apply Changes'
			onSecondarySubmit={(e) => onDelete(e, category.id)}
			secondaryBtnLabel='Delete category'
		/>
	)
}

export default CategoryUpdate
