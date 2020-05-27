import React, { Component } from "react"
import { firebase } from "firebaseConfig"
import PromptUpdate from "./prompt-update"
import "./all-prompts.css"

class AllPrompts extends Component {
	constructor(props) {
		super(props)

		this.state = {
			types: [],
			allPrompts: [],
			newPromptName: "",
		}

		this.onCreate = this.onCreate.bind(this)
		this.onDelete = this.onDelete.bind(this)
	}

	componentDidMount() {
		const db = firebase.firestore()
		db.collection("prompts").onSnapshot((snapshot) => {
			const promptsData = []
			snapshot.forEach((doc) => promptsData.push({ ...doc.data(), id: doc.id }))

			this.setState({
				allPrompts: promptsData,
			})
		})

		db.collection("types").onSnapshot((snapshot) => {
			const typesData = []
			snapshot.forEach((doc) => typesData.push(doc.data()))

			this.setState({
				types: typesData,
			})
		})
	}

	onCreate() {
		console.log("test")
		const db = firebase.firestore()
		db.collection("prompts").add({ description: this.state.newPromptName })
	}

	onDelete(promptId) {
		const db = firebase.firestore()
		db.collection("prompts").doc(promptId).delete()
	}

	render() {
		const { allPrompts, newPromptName, types } = this.state

		console.log(this.state)

		return (
			<div className="prompt-list">
				<input
					type="text"
					value={newPromptName}
					onChange={(e) => {
						this.setState({
							newPromptName: e.target.value,
						})
					}}
				/>
				<button onClick={this.onCreate}>Create</button>
				<hr />

				{allPrompts.map((prompt) => (
					<div key={prompt.id} className="prompt">
						<div className="description">{prompt.description}</div>
						<div className="type">{prompt.type}</div>
						<PromptUpdate prompt={prompt} types={types} />
						<button
							onClick={() => {
								this.onDelete(prompt.id)
							}}
						>
							Delete
						</button>
					</div>
				))}
			</div>
		)
	}
}

export default AllPrompts
