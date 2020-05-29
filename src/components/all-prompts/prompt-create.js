import React, { Component } from "react"
import { firebase } from "firebaseConfig"
import _ from "lodash"

class PromptCreate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newPromptName: "",
			newType: "",
		}

		this.onCreate = this.onCreate.bind(this)
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(prevProps.prompt, this.props.prompt)) {
			this.setState({
				description: this.props.prompt.description,
				type: this.props.prompt.type,
			})
		}
	}

	onCreate() {
		const db = firebase.firestore()
		db.collection("prompts").add({ description: this.state.newPromptName, type: this.state.newType })
		this.setState({
			newPromptName: "",
			newType: "",
		})
	}

	render() {
		const { newPromptName, newType } = this.state
		const { types } = this.props

		return (
			<div className="prompt-action new-prompt">
				<span>Add prompt: </span>
				<input
					type="text"
					value={newPromptName}
					onChange={(e) => {
						this.setState({
							newPromptName: e.target.value,
						})
					}}
					placeholder="Prompt Description"
				/>
				<select
					name="type"
					id=""
					onChange={(e) => {
						this.setState({
							newType: e.target.value,
						})
					}}
					value={newType}
				>
					<option value="none">Select Type</option>
					{types.map((type) => (
						<option key={type.name} value={type.name}>
							{type.name}
						</option>
					))}
				</select>
				<button onClick={this.onCreate} className="btn">
					Create
				</button>
			</div>
		)
	}
}

export default PromptCreate
