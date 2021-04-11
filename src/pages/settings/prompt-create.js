import React from 'react'
import { firebase } from 'firebaseConfig'

import { PromptForm } from './prompt-form'

export const PromptCreate = ({ closeForm }) => {
	const [description, setDescription] = React.useState('')
	const [category, setCategory] = React.useState('')
	// const [image, setImage] = React.useState('')

	const handleCreate = () => {
		const db = firebase.firestore()

		if (description && category) {
			db.collection('prompts').add({
				description: description,
				category: category,
				// imageUrl: image ? image : '',
			})

			setCategory(category)
			setDescription(description)
			setImage(image)

			closeForm()
		}
	}

	const setValue = (prop, value) => {
		switch (prop) {
			case 'description':
				setDescription(value)
				break
			case 'category':
				setCategory(value)
				break
		}
	}

	return (
		<PromptForm
			formName='Create a new prompt'
			closeForm={closeForm}
			descriptionVal={description}
			categoryVal={category}
			setValue={setValue}
			onPrimarySubmit={() => handleCreate()}
			disablePrimary={!description || !category}
			primaryBtnLabel='Create'
		/>
	)
}
