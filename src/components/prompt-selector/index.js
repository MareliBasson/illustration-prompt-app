import React, { Component } from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'
import PromptMenu from 'components/prompt-menu'
import PromptGrid from './prompt-grid'
import './prompt-selector.css'

class PromptSelector extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selected: '',
			selection: [],
		}

		this.onSelect = this.onSelect.bind(this)
		this.clear = this.clear.bind(this)
		this.getListStatus = this.getListStatus.bind(this)
		this.setLists = this.setLists.bind(this)
		this.removeCard = this.removeCard.bind(this)
	}

	componentDidMount() {
		const db = firebase.firestore()

		db.collection('categories').onSnapshot((snapshot) => {
			const categoriesData = []
			snapshot.forEach((doc) => categoriesData.push(doc.data()))

			this.setState({
				categories: categoriesData,
			})
		})

		db.collection('colors').onSnapshot((snapshot) => {
			const colorsData = []
			snapshot.forEach((doc) => colorsData.push(doc.data()))

			this.setState({
				colors: colorsData,
			})
		})

		db.collection('prompts').onSnapshot((snapshot) => {
			const promptsData = []
			snapshot.forEach((doc) => promptsData.push({ ...doc.data(), id: doc.id }))

			this.setState(
				{
					allPrompts: promptsData,
				},
				() => {
					this.setLists()
				}
			)
		})
	}

	setLists() {
		const categoryList = []
		this.state.categories.forEach((category) => {
			if (category.name !== '') {
				categoryList.push(category.name)
			}
		})

		const categoryObj = {}
		categoryList.forEach((category) => (categoryObj[category] = _.filter(this.state.allPrompts, { category: category })))

		this.setState({
			...categoryObj,
		})
	}

	onSelect(e) {
		const selectedValue = e.target.value
		const randomNr = Math.floor(Math.random() * this.state[selectedValue].length)
		const selectionResult = this.state[selectedValue][randomNr]
		const updateSelectedList = this.state[selectedValue].filter((val, index) => index !== randomNr)

		this.setState({
			selection: this.state.selection.concat(selectionResult),
			[selectedValue]: updateSelectedList,
		})
	}

	clear() {
		this.setState({
			selection: [],
		})

		this.setLists()
	}

	getListStatus() {
		const statusObj = {}

		if (this.state.categories) {
			this.state.categories.forEach((category) => {
				if (this.state[category.name]) {
					statusObj[category.name] = this.state[category.name].length
				}
			})
		}

		return statusObj
	}

	removeCard(prompt) {
		this.setState({
			[prompt.category]: this.state[prompt.category].concat(prompt),
			selection: this.state.selection.filter((val) => {
				return val.id !== prompt.id
			}),
		})
	}

	render() {
		const { selection, categories, colors } = this.state

		return (
			<div className="prompt-selector">
				<PromptMenu onClick={this.onSelect} categories={categories} listStatus={this.getListStatus()} colors={colors} />

				<div>
					{selection.length > 0 && (
						<PromptGrid selection={selection} removeCard={this.removeCard} categories={categories} colors={colors} />
					)}
				</div>

				<div onClick={this.clear} className="clear-prompts">
					<i className="fa fa-trash"></i> <span>Clear Selection</span>
				</div>
			</div>
		)
	}
}

export default PromptSelector
