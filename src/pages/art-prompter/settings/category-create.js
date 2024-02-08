import React from 'react'
import { firebase } from 'firebaseConfig'

import { CategoryForm } from 'pages/art-prompter/settings/category-form'

export const CategoryCreate = ({ closeForm }) => {
	const [name, setName] = React.useState('')
	const [title, setTitle] = React.useState('')
	const [color, setColor] = React.useState('')
	const [visible, setVisible] = React.useState(true)

	const handleCreate = () => {
		const db = firebase.firestore()

		if (title && name && color) {
			db.collection('categories').add({
				name,
				title,
				color,
				visible,
			})

			setName('')
			setTitle('')
			setColor('')
			setVisible(true)

			closeForm()
		}
	}

	return (
		<CategoryForm
			formName='Create a new category'
			closeForm={closeForm}
			nameVal={name}
			colorVal={color}
			visibleVal={visible}
			setTitle={setTitle}
			setName={setName}
			setColor={setColor}
			setVisible={setVisible}
			onPrimarySubmit={() => handleCreate()}
			disablePrimary={!name || !color || !title}
			primaryBtnLabel='Create'
		/>
	)
}
