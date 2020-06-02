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
		this.updatePrompt = this.updatePrompt.bind(this)
		this.handleUpdate = this.handleUpdate.bind(this)
	}

	componentDidMount() {
		this.updatePrompt()
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(prevProps.prompt, this.props.prompt)) {
			this.updatePrompt()
		}
	}

	updatePrompt() {
		this.setState({
			description: this.props.prompt.description,
			type: this.props.prompt.type,
		})
	}

	handleUpdate(promptId) {
		const { description, type } = this.state
		const { prompt } = this.props

		const db = firebase.firestore()
		db.collection("prompts")
			.doc(promptId)
			.set({ ...prompt, description, type })

		this.setState({
			description: "",
			type: "",
		})

		this.props.closeUpdate()
	}

	render() {
		const { description, type } = this.state
		const { prompt, types, closeUpdate } = this.props

		// console.log(prompt)

		return (
			<div className="action-container">
				<div className="action update-prompt">
					<div className="form-heading">
						<h3>Update selected prompt: </h3>
						<button onClick={() => closeUpdate()} className="btn btn-icon">
							<i className="fa fa-times"></i>
						</button>
					</div>
					<div className="form-fields">
						<input
							type="text"
							value={description}
							onChange={(e) => {
								this.setState({
									description: e.target.value,
								})
							}}
							placeholder="Description"
						/>
						<div className="select-wrappr">
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
						</div>
					</div>
					<div className="form-btns">
						<button onClick={() => this.handleUpdate(prompt.id)} className="btn btn-primary">
							Apply
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default PromptUpdate
