import React, { useState, useEffect } from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'
import './type-form.css'

const TypeForm = ({
	formName,
	closeForm,
	nameVal,
	titleVal,
	colorVal,
	setValue,
	onPrimarySubmit,
	disablePrimary,
	primaryBtnLabel,
	onSecondarySubmit,
	disableSecondary,
	secondaryBtnLabel,
}) => {
	const [colors, setColors] = useState([])

	useEffect(() => {
		const db = firebase.firestore()

		db.collection('colors').onSnapshot((snapshot) => {
			const colorsData = []
			snapshot.forEach((doc) => colorsData.push(doc.data()))

			if (_.isEmpty(colors)) {
				setColors(_.sortBy(colorsData, 'name'))
			}
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
						<h4>Name:</h4>
						<input
							type="text"
							value={nameVal}
							onChange={(e) => {
								setValue(e.target.value, 'name')
							}}
							placeholder="Name"
						/>
					</div>
					<div className="description">
						<h4>Label:</h4>
						<input
							type="text"
							value={titleVal}
							onChange={(e) => {
								setValue(e.target.value, 'title')
							}}
							placeholder="Label"
						/>
					</div>
					<div className="type">
						<h4>Color:</h4>
						<div className="select-wrapper">
							<select
								name="color"
								id=""
								onChange={(e) => {
									setValue(e.target.value, 'color')
								}}
								value={colorVal}
							>
								<option value="default">Select color</option>
								{colors?.map((color) => (
									<option key={color.name} value={color.name}>
										{color.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

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

export default TypeForm
