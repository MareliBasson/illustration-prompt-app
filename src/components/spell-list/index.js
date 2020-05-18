import React from 'react'
import firebase from 'firebaseConfig'
import SpellInput from './spell-input.js'

function SpellList() {
	const [spells, setSpells] = React.useState([])
	const [newSpellName, setNewSpellName] = React.useState('')

	React.useEffect(() => {
		const db = firebase.firestore()
		return db.collection('spells').onSnapshot((snapshot) => {
			const spellsData = []
			snapshot.forEach((doc) => spellsData.push({ ...doc.data(), id: doc.id }))
			setSpells(spellsData)
		})
	}, [])

	const onCreate = () => {
		const db = firebase.firestore()
		db.collection('spells').add({ name: newSpellName })
	}

	return (
		<ul>
			<input
				type="text"
				value={newSpellName}
				onChange={(e) => {
					setNewSpellName(e.target.value)
				}}
			/>
			<button onClick={onCreate}>Create</button>
			{spells.map((spell) => (
				<li key={spell.id}>
					<SpellInput spell={spell} />
				</li>
			))}
		</ul>
	)
}

export default SpellList
