import React, { Component } from "react"
import { firebase } from "firebaseConfig"
import _ from "lodash"
import PromptForm from "components/prompt-form"

class PromptUpdate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			description: "",
			type: "",
		}
		this.updatePrompt = this.updatePrompt.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
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
			image: this.props.prompt.image,
		})
	}

	handleSubmit(promptId) {
		const { description, type, image } = this.state
		const { prompt } = this.props

		const db = firebase.firestore()
		db.collection("prompts")
			.doc(promptId)
			.set({ ...prompt, description, type, image })

		this.setState({
			description: "",
			type: "",
			image: "",
		})

		this.props.closeForm()
	}

	setValue(value, prop) {
		this.setState({
			[prop]: value,
		})
	}

	render() {
		const { description, type, image } = this.state
		const { prompt, closeForm } = this.props

		return (
			<PromptForm
				formName="Edit selected prompt"
				closeForm={closeForm}
				descriptionVal={description}
				typeVal={type}
				imageUrl={image}
				setValue={this.setValue}
				onSubmit={() => this.handleSubmit(prompt.id)}
				disableSubmit={false}
				submitLabel="Apply"
			/>
		)
	}
}

export default PromptUpdate
