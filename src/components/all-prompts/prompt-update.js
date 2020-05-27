import React from "react"
import { firebase } from "firebaseConfig"

const PromptUpdate = ({ prompt, types }) => {
	const [description, setDescription] = React.useState(prompt.description)
	const [type, setType] = React.useState(prompt.type)

	const onUpdate = () => {
		const db = firebase.firestore()
		db.collection("prompts")
			.doc(prompt.id)
			.set({ ...prompt, description, type })
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
				value={type}
			>
				<option value=""></option>
				{types.map((type) => (
					<option key={type.name} value={type.name}>
						{type.name}
					</option>
				))}
			</select>
			<button onClick={onUpdate}>Update</button>
		</>
	)
}

export default PromptUpdate
