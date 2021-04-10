import React, { Component } from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'
import PromptCreate from './prompt-create'
import PromptUpdate from './prompt-update'
import './settings-prompts.css'

class SettingsPrompts extends Component {
	constructor(props) {
		super(props)

		this.state = {
			prompts: [],
			categories: [],
			editedList: [],
			newPromptName: '',
			newCategories: '',
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
		db.collection('prompts').onSnapshot((snapshot) => {
			const promptsData = []
			snapshot.forEach((doc) => promptsData.push({ ...doc.data(), id: doc.id }))

			this.setState({
				prompts: promptsData,
				editedList: _.sortBy(promptsData, ['category', 'description']),
			})
		})

		db.collection('categories').onSnapshot((snapshot) => {
			const categoriesData = []
			snapshot.forEach((doc) => categoriesData.push(doc.data()))

			this.setState({
				categories: _.sortBy(categoriesData, 'name'),
			})
		})
	}

	onDelete(e, promptId) {
		e.stopPropagation()
		if (window.confirm('Are you sure you want to delete this prompt?')) {
			const db = firebase.firestore()
			db.collection('prompts').doc(promptId).delete()
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

	handleSort(prop) {
		this.setState({
			editedList: _.sortBy(this.state.editedList, prop),
		})
	}

	handleFilter(e) {
		this.setState({
			editedList:
				e.target.value === 'all' ? this.state.prompts : _.filter(this.state.prompts, ['category', e.target.value]),
		})
	}

	render() {
		const { editedList, categories, selectedPrompt, showCreateForm, showCreateBtn } = this.state

		return (
			<>
				<div className="prompt-list">
					<div className="column left">
						<div className="prompt-filters">
							<div className="filter-section filtering">
								Filter by category:{' '}
								<div className="select-wrapper">
									<select name="" id="" onChange={(e) => this.handleFilter(e)}>
										<option value="all">All Prompts</option>
										{categories.map((category) => (
											<option key={category.name} value={category.name}>
												{category.name}
											</option>
										))}
									</select>
								</div>
							</div>
							<div className="filter-section sorting">
								Sort by:
								<div
									className="btn btn-primary btn-in-form"
									onClick={() => this.handleSort('description')}
								>
									Description
								</div>
								<div
									className="btn btn-primary btn-in-form"
									onClick={() => this.handleSort(['category', 'description'])}
								>
									Category
								</div>
							</div>
						</div>
						{editedList.map((prompt) => (
							<div
								key={prompt.id}
								className={`prompt ${_.isEqual(prompt, selectedPrompt) ? 'selected' : ''}`}
								onClick={() => {
									this.selectPrompt(prompt)
								}}
							>
								<div className="description">{prompt.description}</div>
								{/* <div className="image">{prompt.imageUrl && <i className="fa fa-file-image-o"></i>}</div> */}
								<div className="category">{prompt.category}</div>
								{/* <div className="options">
									<button
										onClick={(e) => {
											this.onDelete(e, prompt.id)
										}}
										className="btn btn-icon "
									>
										<i className="fa fa-trash"></i>
									</button>
								</div> */}
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

							{!_.isEmpty(selectedPrompt) && (
								<PromptUpdate prompt={selectedPrompt} closeForm={this.closeForm} />
							)}
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default SettingsPrompts
