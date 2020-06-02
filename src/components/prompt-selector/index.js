import React, { Component } from "react"
import { firebase } from "firebaseConfig"
import _ from "lodash"
import PromptMenu from "components/prompt-menu"
import PromptGrid from "components/prompt-grid"
import "./prompt-selector.css"

class PromptSelector extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selected: "",
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

		db.collection("types").onSnapshot((snapshot) => {
			const typesData = []
			snapshot.forEach((doc) => typesData.push(doc.data()))

			this.setState({
				types: typesData,
			})
		})

		db.collection("prompts").onSnapshot((snapshot) => {
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
		const typeList = []
		this.state.types.forEach((type) => {
			if (type.name !== "") {
				typeList.push(type.name)
			}
		})

		const typeObj = {}
		typeList.forEach((type) => (typeObj[type] = _.filter(this.state.allPrompts, { type: type })))

		this.setState({
			...typeObj,
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

		if (this.state.types) {
			this.state.types.forEach((type) => {
				if (this.state[type.name]) {
					statusObj[type.name] = this.state[type.name].length
				}
			})
		}

		// console.log(statusObj)

		return statusObj
	}

	removeCard(prompt) {
		// console.log("remove card triggered")
		// console.log(prompt)

		this.setState({
			[prompt.type]: this.state[prompt.type].concat(prompt),
			selection: this.state.selection.filter((val) => {
				return val.id !== prompt.id
			}),
		})
	}

	render() {
		const { selection, types } = this.state

		return (
			<div className="prompt-selector">
				<PromptMenu onClick={this.onSelect} types={types} listStatus={this.getListStatus()} />

				<div>{selection.length > 0 && <PromptGrid selection={selection} removeCard={this.removeCard} />}</div>

				<div onClick={this.clear} className="clear-prompts">
					<i className="fa fa-trash"></i> <span>Clear Selection</span>
				</div>
			</div>
		)
	}
}

export default PromptSelector
