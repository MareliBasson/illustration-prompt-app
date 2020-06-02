import React, { Component } from "react"
import { firebase } from "firebaseConfig"
import _ from "lodash"

class PromptCreate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newPromptName: "",
			newType: "",
			validation: "",
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
		const { newPromptName, newType } = this.state
		const db = firebase.firestore()

		if (newPromptName && newType) {
			db.collection("prompts").add({ description: newPromptName, type: newType })
			this.setState({
				newPromptName: "",
				newType: "",
				validation: "",
			})
		} else {
			this.setState({
				validation: "Enter a description and select a type to create a prompt",
			})
		}
	}

	render() {
		const { newPromptName, newType } = this.state
		const { types, closeForm } = this.props

		return (
			<div className="action-container">
				<div className="action new-prompt">
					<div className="form-heading">
						<h3>Create a new prompt: </h3>
						<button onClick={() => closeForm()} className="btn btn-icon">
							<i className="fa fa-times"></i>
						</button>
					</div>
					<div className="form-fields">
						<input
							type="text"
							value={newPromptName}
							onChange={(e) => {
								this.setState({
									newPromptName: e.target.value,
								})
							}}
							placeholder="Description"
						/>
						<div className="select-wrapper">
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
						</div>
					</div>
					<div className="form-btns">
						<button onClick={this.onCreate} className="btn btn-primary" disabled={!newPromptName || !newType}>
							Create
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default PromptCreate
