import React, { Component } from "react"
import { firebase } from "firebaseConfig"
import _ from "lodash"

class PromptUpdate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			description: "",
			type: "",
		}

		this.onUpdate = this.onUpdate.bind(this)
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(prevProps.prompt, this.props.prompt)) {
			this.setState({
				description: this.props.prompt.description,
				type: this.props.prompt.type,
			})
		}
	}

	onUpdate(promptId) {
		const { description, type } = this.state
		const { prompt } = this.props

		const db = firebase.firestore()
		db.collection("prompts")
			.doc(promptId)
			.set({ ...prompt, description, type })
	}

	render() {
		const { description, type } = this.state
		const { prompt, types } = this.props

		return (
			<div className="prompt-action update-prompt">
				<span>Update prompt: </span>
				<input
					type="text"
					value={description}
					onChange={(e) => {
						this.setState({
							description: e.target.value,
						})
					}}
					placeholder="Prompt Description"
				/>
				<select
					name="type"
					id=""
					onChange={(e) => {
						this.setState({
							type: e.target.value,
						})
					}}
					value={type}
				>
					<option value="none">Select Type</option>
					{types.map((type) => (
						<option key={type.name} value={type.name}>
							{type.name}
						</option>
					))}
				</select>
				<button onClick={() => this.onUpdate(prompt.id)} className="btn">
					Update
				</button>
			</div>
		)
	}
}

export default PromptUpdate
