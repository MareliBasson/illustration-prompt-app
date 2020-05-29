import React, { Component } from "react"
import { firebase } from "firebaseConfig"
import _ from "lodash"

class PromptUpdate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			description: "",
		}

		this.onUpdate = this.onUpdate.bind(this)
	}

	onUpdate(promptId) {
		const { description } = this.state
		const { prompt } = this.props

		const db = firebase.firestore()
		db.collection("prompts")
			.doc(promptId)
			.set({ ...prompt, description })
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(prevProps.prompt, this.props.prompt)) {
			this.setState({
				description: this.props.prompt.description,
			})
		}
	}

	render() {
		const { description } = this.state
		const { prompt, types } = this.props

		return (
			<>
				<input
					type="text"
					value={description}
					onChange={(e) => {
						this.setState({
							description: e.target.value,
						})
					}}
				/>
				{/* <select
					name="type"
					id=""
					onChange={(e) => {
						setType(e.target.value)
					}}
					value={type}
				>
					<option value=""></option>
					{types.map((type) => (
						<option key={type.name} value={type.name}>
							{type.name}
						</option>
					))}
				</select> */}
				<button onClick={() => this.onUpdate(prompt.id)}>Update</button>
			</>
		)
	}
}

export default PromptUpdate
