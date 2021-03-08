import React, { useState } from 'react'
import { firebase } from 'firebaseConfig'
import TypeForm from 'components/settings-types/type-form'

const TypeCreate = ({ closeForm }) => {
	const [name, setName] = useState('')
	const [title, setTitle] = useState('')
	const [color, setColor] = useState('')

	const handleCreate = () => {
		const db = firebase.firestore()

		if (title && name && color) {
			db.collection('types').add({
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
		<TypeForm
			formName="Create a new type"
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
export default TypeCreate
