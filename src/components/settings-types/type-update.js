import React, { useEffect, useState } from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'
import TypeForm from 'components/settings-types/type-form'

const TypeUpdate = ({ type, closeForm }) => {
	const [name, setName] = useState('')
	const [title, setTitle] = useState('')
	const [color, setColor] = useState('')

	useEffect(() => {
		updateType()
		console.log('from type')
		console.log(type.name)
		console.log(type.title)
		console.log(type.color)
		console.log('from state')
		console.log(name)
		console.log(title)
		console.log(color)
		console.log('from current')
		console.log(name.current)
		console.log(name.title)
		console.log('-------------------------------')
	}, [name, title, color, type])

	const onDelete = (e, typeId) => {
		e.stopPropagation()
		if (window.confirm('Are you sure you want to delete this type?')) {
			const db = firebase.firestore()
			db.collection('types').doc(typeId).delete()
		}
	}

	const updateType = () => {
		//TODO: should update for onChange in form inputs AND onClick of a type in the list

		// NOTE: Update onChange
		// setName(name || type.name)
		// setColor(color || type.color)
		// setTitle(title || type.title)

		// NOTE:Update on selecting new type
		setName(type.name || name)
		setColor(type.color || color)
		setTitle(type.title || title)
	}

	const handleSubmit = (typeId) => {
		const db = firebase.firestore()
		db.collection('types')
			.doc(typeId)
			.set({ ...type, name, color, title })

		setName('')
		setTitle('')
		setColor('')

		closeForm()
	}

	const haveChanged = name === type.name && color === type.color && title === type.title

	return (
		<TypeForm
			formName="Edit selected type"
			closeForm={closeForm}
			nameVal={name}
			colorVal={color}
			titleVal={title}
			setTitle={setTitle}
			setName={setName}
			setColor={setColor}
			onPrimarySubmit={() => handleSubmit(type.id)}
			disablePrimary={haveChanged}
			primaryBtnLabel="Apply Changes"
			onSecondarySubmit={(e) => onDelete(e, type.id)}
			secondaryBtnLabel="Delete type"
		/>
	)
}

export default TypeUpdate
