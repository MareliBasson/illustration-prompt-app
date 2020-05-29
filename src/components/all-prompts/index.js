import React, { Component } from "react"
import { firebase } from "firebaseConfig"
import _ from "lodash"
import PromptCreate from "./prompt-create"
import PromptUpdate from "./prompt-update"
import "./all-prompts.css"

class AllPrompts extends Component {
	constructor(props) {
		super(props)

		this.state = {
			types: [],
			allPrompts: [],
			newPromptName: "",
			newType: "",
			selectedPrompt: {},
		}

		this.onDelete = this.onDelete.bind(this)
		this.selectPrompt = this.selectPrompt.bind(this)
	}

	componentDidMount() {
		const db = firebase.firestore()
		db.collection("prompts").onSnapshot((snapshot) => {
			const promptsData = []
			snapshot.forEach((doc) => promptsData.push({ ...doc.data(), id: doc.id }))

			this.setState({
				allPrompts: _.sortBy(promptsData, ["type", "description"]),
			})
		})

		db.collection("types").onSnapshot((snapshot) => {
			const typesData = []
			snapshot.forEach((doc) => typesData.push(doc.data()))

			this.setState({
				types: _.sortBy(typesData, "name"),
			})
		})
	}

	onDelete(e, promptId) {
		e.stopPropagation()
		if (window.confirm("Are you sure you want to delete this prompt?")) {
			const db = firebase.firestore()
			db.collection("prompts").doc(promptId).delete()
		}
	}

	selectPrompt(prompt) {
		this.setState({
			selectedPrompt: prompt,
		})
	}

	render() {
		const { allPrompts, types, selectedPrompt } = this.state

		return (
			<div className="prompt-list">
				<div className="column left">
					{allPrompts.map((prompt) => (
						<div
							key={prompt.id}
							className="prompt"
							onClick={() => {
								this.selectPrompt(prompt)
							}}
						>
							<div className="description">{prompt.description}</div>
							<div className="type">{prompt.type}</div>
							<div className="options">
								<button className="update">
									<i className="fa fa-pencil"></i>
								</button>
								<button
									onClick={(e) => {
										this.onDelete(e, prompt.id)
									}}
									className="delete"
								>
									<i className="fa fa-trash"></i>
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="column right">
					<PromptCreate types={types} />

					<PromptUpdate prompt={selectedPrompt} types={types} />
				</div>
			</div>
		)
	}
}

export default AllPrompts
