import React from 'react'
import _ from 'lodash'
import './prompt-menu.css'

const PromptMenu = ({ onClick, types, listStatus, colors }) => {
	const sortedTypesList = _.sortBy(types, 'title')

	return (
		<div className="prompt-menu">
			{types &&
				sortedTypesList.map((type) => {
					const colorObj = _.find(colors, (color) => color.name === type.color)

					return (
						<button
							key={type.name}
							value={type.name}
							onClick={onClick}
							disabled={listStatus && listStatus[type.name] === 0 ? true : false}
							className={type.name}
							style={{ backgroundColor: `#${colorObj?.value}` }}
						>
							{type.title}
						</button>
					)
				})}

			{/* Gooey Menu Test */}
			{/* <nav className="gooey-menu">
					<input type="checkbox" className="menu-open" name="menu-open" id="menu-open" />
					<label className="menu-open-button" htmlFor="menu-open">
						Prompt Me!
					</label>

					{types &&
						types.map((type) => {
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
				</nav> */}
			{/* <!-- filters --> */}
			{/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
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
				</svg> */}
		</div>
	)
}

export default PromptMenu
