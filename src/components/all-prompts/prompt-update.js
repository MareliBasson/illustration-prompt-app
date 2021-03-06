import React, { Component } from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'
import PromptForm from 'components/prompt-form'

class PromptUpdate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			description: '',
			type: '',
			image: '',
		}
		this.updatePrompt = this.updatePrompt.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.onDelete = this.onDelete.bind(this)
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

	onDelete(e, promptId) {
		e.stopPropagation()
		if (window.confirm('Are you sure you want to delete this prompt?')) {
			const db = firebase.firestore()
			db.collection('prompts').doc(promptId).delete()
		}
	}

	updatePrompt() {
		this.setState({
			description: this.props.prompt.description,
			type: this.props.prompt.type,
			image: this.props.prompt.imageUrl,
		})
	}

	handleSubmit(promptId) {
		const { description, type, image } = this.state
		const { prompt } = this.props

		const db = firebase.firestore()
		db.collection('prompts')
			.doc(promptId)
			.set({ ...prompt, description, type, imageUrl: image })

		this.setState({
			description: '',
			type: '',
			image: '',
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

		const haveChanged = description === prompt.description && type === prompt.type && image === prompt.imageUrl

		return (
			<PromptForm
				formName="Edit selected prompt"
				closeForm={closeForm}
				descriptionVal={description}
				typeVal={type}
				imageUrl={image}
				setValue={this.setValue}
				onPrimarySubmit={() => this.handleSubmit(prompt.id)}
				disablePrimary={haveChanged}
				primaryBtnLabel="Apply Changes"
				onSecondarySubmit={(e) => this.onDelete(e, prompt.id)}
				secondaryBtnLabel="Delete Prompt"
			/>
		)
	}
}

export default PromptUpdate
