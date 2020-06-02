import React, { Component } from "react"
import { firebase } from "firebaseConfig"
import _ from "lodash"

class PromptCreate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			types: [],
		}
	}

	componentDidMount() {
		const db = firebase.firestore()

		db.collection("types").onSnapshot((snapshot) => {
			const typesData = []
			snapshot.forEach((doc) => typesData.push(doc.data()))

			this.setState({
				types: _.sortBy(typesData, "name"),
			})
		})
	}

	render() {
		const { types } = this.state
		const { formName, closeForm, descriptionVal, typeVal, setValue, onSubmit, disableSubmit, submitLabel } = this.props

		return (
			<div className="prompt-form-container">
				<div className="prompt-form">
					<div className="form-heading">
						<h3>{formName}</h3>
						<button onClick={() => closeForm()} className="btn btn-icon">
							<i className="fa fa-times"></i>
						</button>
					</div>
					<div className="form-fields">
						<input
							type="text"
							value={descriptionVal}
							onChange={(e) => {
								setValue(e, "description")
							}}
							placeholder="Description"
						/>
						<div className="select-wrapper">
							<select
								name="type"
								id=""
								onChange={(e) => {
									setValue(e, "type")
								}}
								value={typeVal}
							>
								<option value="default">Select Type</option>
								{types.map((type) => (
									<option key={type.name} value={type.name}>
										{type.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="form-btns">
						<button
							onClick={() => {
								onSubmit()
							}}
							className="btn btn-primary"
							disabled={disableSubmit}
						>
							{submitLabel}
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default PromptCreate
