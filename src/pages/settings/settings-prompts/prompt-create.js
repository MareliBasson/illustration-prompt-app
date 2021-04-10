import React, { Component } from 'react'
import { firebase } from 'firebaseConfig'
import PromptForm from './prompt-form'

class PromptCreate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			description: '',
			category: '',
			image: '',
		}

		this.handleCreate = this.handleCreate.bind(this)
		this.setValue = this.setValue.bind(this)
	}

	handleCreate() {
		const { description, category, image } = this.state
		const db = firebase.firestore()

		if (description && category) {
			db.collection('prompts').add({
				description: description,
				category: category,
				imageUrl: image ? image : '',
			})

			this.setState(
				{
					description: '',
					category: '',
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
		const { description, category } = this.state
		const { closeForm } = this.props

		return (
			<PromptForm
				formName="Create a new prompt"
				closeForm={closeForm}
				descriptionVal={description}
				categoryVal={category}
				setValue={this.setValue}
				onPrimarySubmit={() => this.handleCreate()}
				disablePrimary={!description || !category}
				primaryBtnLabel="Create"
			/>
		)
	}
}

export default PromptCreate
