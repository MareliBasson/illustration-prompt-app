import React, { Component } from "react"
import { firebase } from "firebaseConfig"
import _ from "lodash"
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
	}

	componentDidMount() {
		const db = firebase.firestore()

		db.collection("types").onSnapshot((snapshot) => {
			const typesData = []
			snapshot.forEach((doc) => typesData.push({ ...doc.data(), id: doc.id }))

			this.setState({
				typesList: typesData,
			})
		})

		db.collection("prompts").onSnapshot((snapshot) => {
			const promptsData = []
			snapshot.forEach((doc) => promptsData.push({ ...doc.data(), id: doc.id }))

			const typeList = []
			this.state.typesList.forEach((type) => {
				if (type.name !== "") {
					typeList.push(type.name)
				}
			})

			console.log(typeList)

			const typeObj = {}

			typeList.forEach((type) => (typeObj[type] = _.filter(promptsData, { type: type })))

			this.setState({
				promptList: promptsData,
				...typeObj,
			})
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
	}

	render() {
		const { selection, typesList } = this.state

		console.log(this.state)

		return (
			<div className="prompt-selector">
				<select name="" id="" onChange={this.onSelect}>
					{typesList &&
						typesList.map((type) => (
							<option key={type.name} value={type.name}>
								{type.title}
							</option>
						))}
				</select>

				<br />

				<button onClick={this.clear}>Clear Selection</button>

				<br />

				<div>
					<h3>Selection</h3>
					{selection.map((prompt, index) => (
						<div key={`prompt-${index}`}>{prompt.description}</div>
					))}
				</div>
			</div>
		)
	}
}

export default PromptSelector
