import React, { Component } from "react"
import "./prompt-grid.css"

class PromptGrid extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	render() {
		const { selection } = this.props

		return (
			<div className="prompt-grid">
				{selection.map((prompt, index) => (
					<div key={`prompt-${index}`} className={`card ${prompt.type}`}>
						<div className="title">{prompt.description}</div>
						<div className="subtitle">{prompt.type}</div>
					</div>
				))}
			</div>
		)
	}
}

export default PromptGrid
