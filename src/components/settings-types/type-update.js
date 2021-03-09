import React, { useEffect, useState, useCallback, useRef } from 'react'
import _ from 'lodash'
import { firebase } from 'firebaseConfig'
import TypeForm from 'components/settings-types/type-form'

const TypeUpdate = ({ type, closeForm }) => {
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

	const prevType = usePrevious(type)

	const updateType = useCallback(() => {
		if (!_.isEqual(prevType, type)) {
			setName(type.name)
			setTitle(type.title)
			setColor(type.color)
		} else {
			setName(name)
			setTitle(title)
			setColor(color)
		}
	}, [type, prevType, name, title, color])

	useEffect(() => {
		updateType()
	}, [updateType])

	const onDelete = (e, typeId) => {
		e.stopPropagation()
		if (window.confirm('Are you sure you want to delete this type?')) {
			const db = firebase.firestore()
			db.collection('types').doc(typeId).delete()
		}
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
