import React, { Component } from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'

import {PromptMenu} from 'components/prompt-menu'
import PromptGrid from './prompt-grid'
import styled from 'styled-components'
import { tokens } from 'styles/variables'

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
			<div>
				<PromptMenu onClick={this.onSelect} categories={categories} listStatus={this.getListStatus()} colors={colors} />

				<div>
					{selection.length > 0 && (
						<PromptGrid selection={selection} removeCard={this.removeCard} categories={categories} colors={colors} />
					)}
				</div>

				<ClearPrompts onClick={this.clear}>
					<i className="fa fa-trash"></i> <span>Clear Selection</span>
				</ClearPrompts>
			</div>
		)
	}
}

const ClearPrompts = styled.div`
		position: fixed;
		right: -126px;
		width: 180px;
		height: 80px;
		top: 45%;
		background-color: ${tokens.colorRed};
		border-radius: 80px 0% 0 80px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		text-align: right;
		padding: 10px 10px 10px 20px;
		transition: right 0.2s ease;
		cursor: pointer;
		box-sizing: border-box;

		i {
			font-size: 26px;
			margin-right: 26px;
		}
		span {
			font-size: 1.2rem;
		}
		&:hover {
			right: 0px;
			transition: right 0.2s ease;
		}

`

export default PromptSelector
