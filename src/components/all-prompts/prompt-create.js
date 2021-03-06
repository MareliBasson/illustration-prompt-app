import React, { Component } from 'react'
import { firebase } from 'firebaseConfig'
import PromptForm from 'components/prompt-form'

class PromptCreate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			description: '',
			type: '',
			image: '',
		}

		this.handleCreate = this.handleCreate.bind(this)
		this.setValue = this.setValue.bind(this)
	}

	handleCreate() {
		const { description, type, image } = this.state
		const db = firebase.firestore()

		if (description && type) {
			db.collection('prompts').add({
				description: description,
				type: type,
				imageUrl: image ? image : '',
			})

			this.setState(
				{
					description: '',
					type: '',
					image: '',
				},
				() => {
					this.props.closeForm()
				}
			)
		}
	}

	setValue(value, prop) {
		this.setState({
			[prop]: value,
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
				onPrimarySubmit={() => this.handleCreate()}
				disablePrimary={!description || !type}
				primaryBtnLabel="Create"
			/>
		)
	}
}

export default PromptCreate
