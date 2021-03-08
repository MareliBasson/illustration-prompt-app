import React, { Component } from 'react'
import { firebase } from 'firebaseConfig'
import TypeForm from 'components/settings-types/type-form'

class TypeCreate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			title: '',
			color: '',
		}

		this.handleCreate = this.handleCreate.bind(this)
		this.setValue = this.setValue.bind(this)
	}

	handleCreate() {
		const { name, title, color } = this.state
		const db = firebase.firestore()

		if (name && color) {
			db.collection('types').add({
				name,
				title,
				color,
			})

			this.setState(
				{
					name: '',
					title: '',
					color: '',
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
		const { name, color } = this.state
		const { closeForm } = this.props

		return (
			<TypeForm
				formName="Create a new type"
				closeForm={closeForm}
				nameVal={name}
				colorVal={color}
				setValue={this.setValue}
				onPrimarySubmit={() => this.handleCreate()}
				disablePrimary={!name || !color}
				primaryBtnLabel="Create"
			/>
		)
	}
}

export default TypeCreate
