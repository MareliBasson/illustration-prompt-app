import React from 'react'
import _ from 'lodash'
import './prompt-menu.css'

const PromptMenu = ({ onClick, categories, listStatus, colors }) => {
	const sortedCategoriesList = _.sortBy(categories, 'title')

	return (
		<div className="prompt-menu">
			{categories &&
				sortedCategoriesList.map((category) => {
					const colorObj = _.find(colors, (color) => color.name === category.color)

					return (
						<button
							key={category.name}
							value={category.name}
							onClick={onClick}
							disabled={listStatus && listStatus[category.name] === 0 ? true : false}
							className={category.name}
							style={{ backgroundColor: `#${colorObj?.value}` }}
						>
							{category.title}
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
