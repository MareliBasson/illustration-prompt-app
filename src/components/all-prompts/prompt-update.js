import React, { Component } from "react"
import { firebase } from "firebaseConfig"
import _ from "lodash"
import PromptForm from "./prompt-form"

class PromptUpdate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			description: "",
			type: "",
		}
		this.updatePrompt = this.updatePrompt.bind(this)
		this.handleUpdate = this.handleUpdate.bind(this)
		this.setValue = this.setValue.bind(this)
	}

	componentDidMount() {
		this.updatePrompt()
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(prevProps.prompt, this.props.prompt)) {
			this.updatePrompt()
		}
	}

	updatePrompt() {
		this.setState({
			description: this.props.prompt.description,
			type: this.props.prompt.type,
		})
	}

	handleUpdate(promptId) {
		const { description, type } = this.state
		const { prompt } = this.props

		const db = firebase.firestore()
		db.collection("prompts")
			.doc(promptId)
			.set({ ...prompt, description, type })

		this.setState({
			description: "",
			type: "",
		})

		this.props.closeUpdate()
	}

	setValue(e, prop) {
		this.setState({
			[prop]: e.target.value,
		})
	}

	render() {
		const { description, type } = this.state
		const { prompt, closeUpdate } = this.props

		return (
			<PromptForm
				formName="Edit selected prompt"
				closeForm={closeUpdate}
				descriptionVal={description}
				typeVal={type}
				setValue={this.setValue}
				onSubmit={() => this.handleUpdate(prompt.id)}
				disableSubmit={false}
				submitLabel="Apply"
			/>
		)
	}
}

export default PromptUpdate
