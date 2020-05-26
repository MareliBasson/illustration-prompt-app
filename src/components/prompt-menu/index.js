import React, { Component } from "react"
import "./prompt-menu.css"

class PromptMenu extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	render() {
		const { onClick, typesList } = this.props

		return (
			<div className="prompt-menu">
				{/* <select name="" id="" onChange={this.onSelect}>
					{typesList &&
						typesList.map((type) => {
							return (
								<option
									key={type.name}
									value={type.name}
									disabled={this.state[type.name] && this.state[type.name].length === 0}
								>
									{type.title}
								</option>
							)
						})}
				</select> */}

				{/* {typesList &&
					typesList.map((type) => {
						return (
							<button
								key={type.name}
								value={type.name}
								onClick={onClick}
								disabled={this.state[type.name] && this.state[type.name].length === 0}
							>
								{type.title}
							</button>
						)
					})} */}

				<nav className="gooey-menu">
					<input type="checkbox" className="menu-open" name="menu-open" id="menu-open" />
					<label className="menu-open-button" htmlFor="menu-open">
						Prompt Me!
					</label>

					{/* <a className="menu-item">
						<i className="fa fa-bar-chart"></i>
					</a>
					<a className="menu-item">
						<i className="fa fa-plus"></i>
					</a>
					<a className="menu-item">
						<i className="fa fa-heart"></i>
					</a>
					<a className="menu-item">
						<i className="fa fa-envelope"></i>
					</a> */}

					{typesList &&
						typesList.map((type) => {
							return (
								<button
									key={type.name}
									value={type.name}
									onClick={onClick}
									disabled={this.state[type.name] && this.state[type.name].length === 0}
									className="menu-item"
								>
									{type.title}
								</button>
							)
						})}
				</nav>

				{/* <!-- filters --> */}
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
					<defs>
						<filter id="shadowed-goo">
							<feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
							<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
							<feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
							<feColorMatrix
								in="shadow"
								mode="matrix"
								values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
								result="shadow"
							/>
							<feOffset in="shadow" dx="1" dy="1" result="shadow" />
							<feComposite in2="shadow" in="goo" result="goo" />
							<feComposite in2="goo" in="SourceGraphic" result="mix" />
						</filter>
						<filter id="goo">
							<feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
							<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
							<feComposite in2="goo" in="SourceGraphic" result="mix" />
						</filter>
					</defs>
				</svg>
			</div>
		)
	}
}

export default PromptMenu
