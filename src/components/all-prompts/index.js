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
			allPrompts: [],
			newPromptName: "",
			newType: "",
			selectedPrompt: {},
			showCreateForm: false,
			showCreateBtn: true,
		}

		this.onDelete = this.onDelete.bind(this)
		this.selectPrompt = this.selectPrompt.bind(this)
		this.closeForm = this.closeForm.bind(this)
		this.openCreateForm = this.openCreateForm.bind(this)
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
	}

	onDelete(e, promptId) {
		e.stopPropagation()
		if (window.confirm("Are you sure you want to delete this prompt?")) {
			const db = firebase.firestore()
			db.collection("prompts").doc(promptId).delete()
		}
	}

	selectPrompt(prompt) {
		const { selectedPrompt } = this.state

		if (_.isEmpty(selectedPrompt) || !_.isEqual(prompt, selectedPrompt)) {
			this.setState({
				selectedPrompt: prompt,
				showCreateBtn: false,
				showCreateForm: false,
			})
		}
	}

	closeForm() {
		this.setState({
			selectedPrompt: {},
			showCreateForm: false,
			showCreateBtn: true,
		})
	}

	openCreateForm() {
		this.setState({
			showCreateForm: true,
			showCreateBtn: false,
		})
	}

	render() {
		const { allPrompts, selectedPrompt, showCreateForm, showCreateBtn } = this.state

		return (
			<div className="prompt-list">
				<div className="column left">
					{allPrompts.map((prompt) => (
						<div
							key={prompt.id}
							className={`prompt ${_.isEqual(prompt, selectedPrompt) ? "selected" : ""}`}
							onClick={() => {
								this.selectPrompt(prompt)
							}}
						>
							<div className="description">{prompt.description}</div>
							<div className="type">{prompt.type}</div>
							<div className="options">
								<button
									onClick={(e) => {
										this.onDelete(e, prompt.id)
									}}
									className="btn btn-icon "
								>
									<i className="fa fa-trash"></i>
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="column right">
					<div className="prompt-actions">
						{showCreateBtn && (
							<div
								onClick={() => {
									this.openCreateForm()
								}}
								className="btn-create-prompt"
							>
								<i className="fa fa-plus"></i>
								<h3>Create Prompt</h3>
							</div>
						)}

						{showCreateForm && <PromptCreate closeForm={this.closeForm} />}

						{!_.isEmpty(selectedPrompt) && <PromptUpdate prompt={selectedPrompt} closeForm={this.closeForm} />}
					</div>
				</div>
			</div>
		)
	}
}

export default AllPrompts
