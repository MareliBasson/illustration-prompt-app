import React from "react"
import { firebase } from "firebaseConfig"
import "./all-prompts.css"

function AllPrompts() {
	const [prompts, setPrompts] = React.useState([])

	React.useEffect(() => {
		const db = firebase.firestore()
		return db.collection("prompts").onSnapshot((snapshot) => {
			const promptsData = []
			snapshot.forEach((doc) => promptsData.push({ ...doc.data(), id: doc.id }))
			setPrompts(promptsData)
		})
	}, [])

	return (
		<div className="prompt-list">
			{prompts.map((card) => (
				<div key={card.id} className="prompt">
					<div className="description">{card.description}</div>
					<div className="type">{card.type}</div>
				</div>
			))}
		</div>
	)
}

export default AllPrompts
