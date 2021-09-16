import React from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'

import { PromptForm } from './prompt-form'

export const PromptUpdate = ({ closeForm, prompt }) => {
	const [description, setDescription] = React.useState('')
	const [category, setCategory] = React.useState('')

	React.useEffect(() => {
		updatePrompt()
	}, [prompt])

	const onDelete = (e, promptId) => {
		e.stopPropagation()

		if (window.confirm('Are you sure you want to delete this prompt?')) {
			const db = firebase.firestore()
			db.collection('prompts').doc(promptId).delete()
		}
	}

	const updatePrompt = () => {
		setDescription(prompt.description)
		setCategory(prompt.category)
	}

	const handleSubmit = (promptId) => {
		const db = firebase.firestore()

		db.collection('prompts')
			.doc(promptId)
			.set({
				...prompt,
				description,
				category,
				// imageUrl: image
			})

		setDescription('')
		setCategory('')

		closeForm()
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

	const haveChanged =
		description === prompt.description && category === prompt.category
	// && image === prompt.imageUrl

	return (
		<PromptForm
			formName='Edit selected prompt'
			closeForm={closeForm}
			descriptionVal={description}
			categoryVal={category}
			// imageUrl={image}
			setValue={setValue}
			onPrimarySubmit={() => handleSubmit(prompt.id)}
			disablePrimary={haveChanged}
			primaryBtnLabel='Apply Changes'
			onSecondarySubmit={(e) => onDelete(e, prompt.id)}
			secondaryBtnLabel='Delete Prompt'
		/>
	)
}
