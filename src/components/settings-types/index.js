import React, { Component } from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'
import TypeCreate from './type-create'
import TypeUpdate from './type-update'
import './settings-types.css'

class SettingsTypes extends Component {
	constructor(props) {
		super(props)

		this.state = {
			types: [],
			colors: [],
			editedList: [],
			selectedType: {},
			showCreateForm: false,
			showCreateBtn: true,
		}

		this.onDelete = this.onDelete.bind(this)
		this.selectType = this.selectType.bind(this)
		this.closeForm = this.closeForm.bind(this)
		this.openCreateForm = this.openCreateForm.bind(this)
	}

	componentDidMount() {
		const db = firebase.firestore()
		db.collection('types').onSnapshot((snapshot) => {
			const typesData = []
			snapshot.forEach((doc) => typesData.push({ ...doc.data(), id: doc.id }))

			this.setState({
				types: typesData,
				editedList: _.sortBy(typesData, 'name'),
			})
		})

		db.collection('colors').onSnapshot((snapshot) => {
			const colorsData = []
			snapshot.forEach((doc) => colorsData.push(doc.data()))

			this.setState({
				colors: _.sortBy(colorsData, 'title'),
			})
		})
	}

	onDelete(e, typeId) {
		e.stopPropagation()
		if (window.confirm('Are you sure you want to delete this type?')) {
			const db = firebase.firestore()
			db.collection('types').doc(typeId).delete()
		}
	}

	selectType(type) {
		const { selectedType } = this.state

		if (_.isEmpty(selectedType) || !_.isEqual(type, selectedType)) {
			this.setState({
				selectedType: type,
				showCreateBtn: false,
				showCreateForm: false,
			})
		}
	}

	closeForm() {
		this.setState({
			selectedType: {},
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

	handleSort(prop) {
		this.setState({
			editedList: _.sortBy(this.state.editedList, prop),
		})
	}

	render() {
		const { editedList, selectedType, showCreateForm, showCreateBtn, colors } = this.state

		return (
			<>
				<div className="prompt-list">
					<div className="column left">
						<div className="prompt-filters">
							<div className="sorting">
								Sort by:
								<div className="btn btn-primary btn-in-form" onClick={() => this.handleSort('title')}>
									Title
								</div>
								<div className="btn btn-primary btn-in-form" onClick={() => this.handleSort('name')}>
									Name
								</div>
								<div className="btn btn-primary btn-in-form" onClick={() => this.handleSort('color')}>
									Color
								</div>
							</div>
						</div>
						{editedList.map((type) => {
							const colorObj = _.find(colors, (color) => color.name === type.color)

							return (
								<div
									key={type.id}
									className={`prompt ${_.isEqual(type, selectedType) ? 'selected' : ''}`}
									onClick={() => {
										this.selectType(type)
									}}
								>
									<div className="title">{type.title}</div>
									<div className="name">{type.name}</div>
									<div className="color">
										{type.color} <span style={{ backgroundColor: `#${colorObj?.value}` }}></span>
									</div>
								</div>
							)
						})}
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
									<h3>Create Type</h3>
								</div>
							)}

							{showCreateForm && <TypeCreate closeForm={this.closeForm} />}

							{!_.isEmpty(selectedType) && <TypeUpdate type={selectedType} closeForm={this.closeForm} />}
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default SettingsTypes
