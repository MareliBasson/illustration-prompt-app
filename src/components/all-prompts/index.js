import React from "react"
import { firebase } from "firebaseConfig"
import PromptUpdate from "./prompt-update"
import "./all-prompts.css"

function AllPrompts() {
	const [prompts, setPrompts] = React.useState([])
	const [newPromptName, setNewPromptName] = React.useState("")

	React.useEffect(() => {
		const db = firebase.firestore()
		return db.collection("prompts").onSnapshot((snapshot) => {
			const promptsData = []
			snapshot.forEach((doc) => promptsData.push({ ...doc.data(), id: doc.id }))
			setPrompts(promptsData)
		})
	}, [])

	const onCreate = () => {
		console.log("test")
		const db = firebase.firestore()
		db.collection("prompts").add({ description: newPromptName })
	}

	const onDelete = (promptId) => {
		const db = firebase.firestore()
		db.collection("prompts").doc(promptId).delete()
	}

	return (
		<div className="prompt-list">
			<input
				type="text"
				value={newPromptName}
				onChange={(e) => {
					setNewPromptName(e.target.value)
				}}
			/>
			<button onClick={onCreate}>Create</button>
			<hr />

			{prompts.map((prompt) => (
				<div key={prompt.id} className="prompt">
					<div className="description">{prompt.description}</div>
					<div className="type">{prompt.type}</div>
					<PromptUpdate prompt={prompt} />
					<button
						onClick={() => {
							onDelete(prompt.id)
						}}
					>
						Delete
					</button>
				</div>
			))}
		</div>
	)
}

export default AllPrompts
