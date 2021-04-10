import React, { useState, useEffect } from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'
import ImageUploader from 'pages/components/image-uploader'
import './prompt-form.css'

const PromptForm = ({
	formName,
	closeForm,
	descriptionVal,
	categoryVal,
	setValue,
	onPrimarySubmit,
	disablePrimary,
	primaryBtnLabel,
	onSecondarySubmit,
	disableSecondary,
	secondaryBtnLabel,
	imageUrl,
}) => {
	const [categories, setCategories] = useState()

	useEffect(() => {
		const db = firebase.firestore()

		db.collection('categories').onSnapshot((snapshot) => {
			const categoriesData = []
			snapshot.forEach((doc) => categoriesData.push(doc.data()))

			setCategories(_.sortBy(categoriesData, 'name'))
		})
	})

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
								setValue(e.target.value, 'description')
							}}
							placeholder="Description"
						/>
					</div>
					<div className="category">
						<h4>Category:</h4>
						<div className="select-wrapper">
							<select
								name="category"
								id=""
								onChange={(e) => {
									setValue(e.target.value, 'category')
								}}
								value={categoryVal}
							>
								<option value="default">Select category</option>
								{categories?.map((category) => (
									<option key={category.name} value={category.name}>
										{category.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				<ImageUploader setValue={setValue} imageUrl={imageUrl} />

				<div className="form-btns">
					{secondaryBtnLabel && (
						<button
							onClick={(e) => {
								onSecondarySubmit(e)
								closeForm()
							}}
							className="btn btn-destruct"
							disabled={disableSecondary}
						>
							{secondaryBtnLabel}
						</button>
					)}
					<button
						onClick={() => {
							onPrimarySubmit()
						}}
						className="btn btn-confirm"
						disabled={disablePrimary}
					>
						{primaryBtnLabel}
					</button>
				</div>
			</div>
		</div>
	)
}

export default PromptForm
