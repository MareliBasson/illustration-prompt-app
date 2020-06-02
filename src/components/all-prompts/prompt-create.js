import React, { Component } from "react"
import { firebase } from "firebaseConfig"
import _ from "lodash"
import PromptForm from "components/prompt-form"

class PromptCreate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			description: "",
			type: "",
		}

		this.handleCreate = this.handleCreate.bind(this)
		this.setValue = this.setValue.bind(this)
	}

	handleCreate() {
		const { description, type } = this.state
		const db = firebase.firestore()

		if (description && type) {
			db.collection("prompts").add({ description: description, type: type })
			this.setState({
				description: "",
				type: "",
			})
		}
	}

	setValue(e, prop) {
		this.setState({
			[prop]: e.target.value,
		})
	}

	render() {
		const { description, type } = this.state
		const { closeForm } = this.props

		return (
			<PromptForm
				formName="Create a new prompt"
				closeForm={closeForm}
				descriptionVal={description}
				typeVal={type}
				setValue={this.setValue}
				onSubmit={() => this.handleCreate()}
				disableSubmit={!description || !type}
				submitLabel="Create"
			/>
		)
	}
}

export default PromptCreate
