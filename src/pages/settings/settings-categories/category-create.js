import React, { useState } from 'react'
import { firebase } from 'firebaseConfig'
import CategoryForm from 'pages/settings/settings-categories/category-form'

const CategoryCreate = ({ closeForm }) => {
	const [name, setName] = useState('')
	const [title, setTitle] = useState('')
	const [color, setColor] = useState('')

	const handleCreate = () => {
		const db = firebase.firestore()

		if (title && name && color) {
			db.collection('categories').add({
				name,
				title,
				color,
			})

			setName('')
			setTitle('')
			setColor('')

			closeForm()
		}
	}

	return (
		<CategoryForm
			formName="Create a new category"
			closeForm={closeForm}
			nameVal={name}
			colorVal={color}
			setTitle={setTitle}
			setName={setName}
			setColor={setColor}
			onPrimarySubmit={() => handleCreate()}
			disablePrimary={!name || !color || !title}
			primaryBtnLabel="Create"
		/>
	)
}
export default CategoryCreate
