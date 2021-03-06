import React from 'react'
import './prompt-grid.css'
import _ from 'lodash'

const PromptGrid = ({ selection, removeCard, types, colors }) => {
	return (
		<div className="prompt-grid">
			{selection.map((prompt, index) => {
				const typeObj = _.find(types, (type) => type.name === prompt.type)

				const colorObj = _.find(colors, (color) => color.name === typeObj.color)

				return (
					<div
						key={`prompt-${index}`}
						className={`card ${prompt.type}`}
						style={{ borderColor: `#${colorObj?.value ?? 'aaaaaa'}` }}
					>
						<div
							className="remove-card"
							onClick={() => {
								removeCard(prompt)
							}}
						>
							<i className="fa fa-times"></i>
						</div>
						{/* <div className="image">
							<img src={prompt.imageUrl ? prompt.imageUrl : 'images/placeholder.png'} alt="" />
						</div> */}
						<div className="title">{prompt.description}</div>
						<div className="subtitle">{prompt.type}</div>
					</div>
				)
			})}
		</div>
	)
}

export default PromptGrid
