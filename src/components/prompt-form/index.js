import React, { Component } from "react"
import { firebase } from "firebaseConfig"
import _ from "lodash"
import ImageUploader from "components/image-uploader"
import "./prompt-form.css"

class PromptForm extends Component {
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
		const { formName, closeForm, descriptionVal, typeVal, setValue, onSubmit, disableSubmit, submitLabel, imageUrl } = this.props

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
						<div className="description">
							<h4>Description:</h4>
							<input
								type="text"
								value={descriptionVal}
								onChange={(e) => {
									setValue(e.target.value, "description")
								}}
								placeholder="Description"
							/>
						</div>
						<div className="type">
							<h4>Type:</h4>
							<div className="select-wrapper">
								<select
									name="type"
									id=""
									onChange={(e) => {
										setValue(e.target.value, "type")
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
					</div>
					<ImageUploader setValue={setValue} imageUrl={imageUrl} />
					<div className="form-btns">
						<button
							onClick={() => {
								onSubmit()
							}}
							className="btn btn-confirm"
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

export default PromptForm
