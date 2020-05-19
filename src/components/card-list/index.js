import React from "react"
import { firebase } from "firebaseConfig"

function PromptList() {
	const [spells, setSpells] = React.useState([])
	const [newSpellName, setNewSpellName] = React.useState("")

	React.useEffect(() => {
		const db = firebase.firestore()
		return db.collection("cards").onSnapshot((snapshot) => {
			const spellsData = []
			snapshot.forEach((doc) => spellsData.push({ ...doc.data(), id: doc.id }))
			setSpells(spellsData)
		})
	}, [])

	const onCreate = () => {
		const db = firebase.firestore()
		db.collection("cards").add({ name: newSpellName })
	}

	return (
		<div className="prompt-list">
			<div className="prompt">
				{spells.map((spell) => (
					<>
						<div className="description">{spell.description}</div>
						<div className="type">{spell.type}</div>
					</>
				))}
			</div>
		</div>
	)
}

export default PromptList
