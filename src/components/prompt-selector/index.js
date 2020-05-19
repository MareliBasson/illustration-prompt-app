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

	componentDidUpdate() {
		// console.log(this.state.selected)
	}

	componentDidMount() {
		const db = firebase.firestore()

		db.collection("prompts").onSnapshot((snapshot) => {
			const promptsData = []
			snapshot.forEach((doc) => promptsData.push({ ...doc.data(), id: doc.id }))

			const typeList = []
			_.uniqBy(promptsData, "type").forEach((type) => {
				if (type.type !== "") {
					typeList.push(type.type + "List")
				}
			})

			const typeObj = {}
			typeList.forEach((list) => (typeObj[list] = []))

			console.log(typeObj)

			this.setState({
				promptList: promptsData,
				...typeObj,
			})
		})
	}

	onSelect(e) {
		this.setState({
			selection: this.state.selection.concat(e.target.value),
		})
	}

	clear() {
		this.setState({
			selection: [],
		})
	}

	render() {
		const { selection } = this.state

		console.log(this.state)

		return (
			<div className="prompt-selector">
				<select name="" id="" onChange={this.onSelect}>
					<option value="subject">Choose a subject</option>
					<option value="accessory">Add an accessory</option>
					<option value="details">Add some details</option>
					<option value="feeling">What's the feeling?</option>
					<option value="wild">Wild card</option>
					<option value="weird">Make it weird</option>
					<option value="style">Choose the format</option>
				</select>
				<br />
				<button onClick={this.clear}>Clear Selection</button>
				<br />
				<div>
					<h3>Selection</h3>
					{selection.map((prompt, index) => (
						<div key={`prompt-${index}`}>{prompt}</div>
					))}
				</div>
			</div>
		)
	}
}

export default PromptSelector
