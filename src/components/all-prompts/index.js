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
			selectedPrompt: {},
		}

		this.onCreate = this.onCreate.bind(this)
		this.onDelete = this.onDelete.bind(this)
		this.onUpdate = this.onUpdate.bind(this)
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
		const db = firebase.firestore()
		db.collection("prompts").add({ description: this.state.newPromptName })
	}

	onDelete(promptId) {
		const db = firebase.firestore()
		db.collection("prompts").doc(promptId).delete()
	}

	onUpdate(prompt) {
		this.setState({
			selectedPrompt: prompt,
		})
	}

	render() {
		const { allPrompts, newPromptName, types, selectedPrompt } = this.state

		// console.log(this.state)
		console.log(selectedPrompt)

		return (
			<div className="prompt-list">
				<div className="column left">
					{allPrompts.map((prompt) => (
						<div key={prompt.id} className="prompt">
							<div className="description">{prompt.description}</div>
							<div className="type">{prompt.type}</div>
							<div className="options">
								<button
									onClick={() => {
										this.onDelete(prompt.id)
									}}
									className="delete"
								>
									<i className="fa fa-trash"></i>
								</button>
								<button
									onClick={() => {
										this.onUpdate(prompt)
									}}
									className="update"
								>
									<i className="fa fa-pencil"></i>
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="column right">
					<span>Add new prompt: </span>
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

					<PromptUpdate prompt={selectedPrompt} types={types} />
				</div>
			</div>
		)
	}
}

export default AllPrompts
