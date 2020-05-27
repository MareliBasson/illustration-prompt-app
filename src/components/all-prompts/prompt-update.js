import React from "react"
import { firebase } from "firebaseConfig"

const PromptUpdate = ({ prompt }) => {
	const [description, setDescription] = React.useState(prompt.description)
	const [type, setType] = React.useState(prompt.type)

	const onUpdate = () => {
		const db = firebase.firestore()
		db.collection("prompts")
			.doc(prompt.id)
			.set({ ...prompt, description })
	}

	return (
		<>
			<input
				type="text"
				value={description}
				onChange={(e) => {
					setDescription(e.target.value)
				}}
			/>
			<select
				name="type"
				id=""
				onChange={(e) => {
					setType(e.target.value)
				}}
			>
				<option value=""></option>
			</select>
			<button onClick={onUpdate}>Update</button>
		</>
	)
}

export default PromptUpdate
