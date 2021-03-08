import React, { Component } from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'
import TypeForm from 'components/settings-types/type-form'

class TypeUpdate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			type: '',
			image: '',
		}
		this.updateType = this.updateType.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.onDelete = this.onDelete.bind(this)
		this.setValue = this.setValue.bind(this)
	}

	componentDidMount() {
		this.updateType()
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(prevProps.type, this.props.type)) {
			this.updateType()
		}
	}

	onDelete(e, typeId) {
		e.stopPropagation()
		if (window.confirm('Are you sure you want to delete this type?')) {
			const db = firebase.firestore()
			db.collection('types').doc(typeId).delete()
		}
	}

	updateType() {
		this.setState({
			name: this.props.type.name,
			color: this.props.type.color,
			title: this.props.type.title,
		})
	}

	handleSubmit(typeId) {
		const { name, color, title } = this.state
		const { type } = this.props

		const db = firebase.firestore()
		db.collection('types')
			.doc(typeId)
			.set({ ...type, name, color, title })

		this.setState({
			name: '',
			color: '',
			title: '',
		})

		this.props.closeForm()
	}

	setValue(value, prop) {
		this.setState({
			[prop]: value,
		})
	}

	render() {
		const { name, color, title } = this.state
		const { type, closeForm } = this.props

		const haveChanged = name === type.name && color === type.color && title === type.title

		return (
			<TypeForm
				formName="Edit selected type"
				closeForm={closeForm}
				nameVal={name}
				colorVal={color}
				titleVal={title}
				setValue={this.setValue}
				onPrimarySubmit={() => this.handleSubmit(type.id)}
				disablePrimary={haveChanged}
				primaryBtnLabel="Apply Changes"
				onSecondarySubmit={(e) => this.onDelete(e, type.id)}
				secondaryBtnLabel="Delete type"
			/>
		)
	}
}

export default TypeUpdate
