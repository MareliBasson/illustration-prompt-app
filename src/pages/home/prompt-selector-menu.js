import React from 'react'
import _ from 'lodash'

import styled from 'styled-components'
import { tokens } from 'styles/tokens'

export const PromptSelectorMenu = ({
	onClick,
	categories,
	listStatus,
	colors,
}) => {
	// Enable to sort prompt buttons alphabetically
	// const sortedCategoriesList = _.sortBy(categories, 'title')

	const [showReload, setShowReload] = React.useState(false)

	React.useEffect(() => {
		setTimeout(() => {
			setShowReload(true)
		}, 5000)
	})

	if (categories.length < 1) {
		return (
			<SelectorMenuWrapper>
				<LoaderWrapper>
					{showReload && (
						<ReloadMsg>
							If no buttons have appeared yet please refresh the
							page.{' '}
						</ReloadMsg>
					)}
					<Loader
						version='1.1'
						id='L4'
						xmlns='http://www.w3.org/2000/svg'
						xmlnsXlink='http://www.w3.org/1999/xlink'
						x='0px'
						y='0px'
						viewBox='0 0 100 100'
						enable-background='new 0 0 0 0'
						xmlSpace='preserve'
					>
						<circle fill='#fff' stroke='none' cx='6' cy='50' r='6'>
							<animate
								attributeName='opacity'
								dur='1s'
								values='0;1;0'
								repeatCount='indefinite'
								begin='0.1'
							/>
						</circle>
						<circle fill='#fff' stroke='none' cx='26' cy='50' r='6'>
							<animate
								attributeName='opacity'
								dur='1s'
								values='0;1;0'
								repeatCount='indefinite'
								begin='0.2'
							/>
						</circle>
						<circle fill='#fff' stroke='none' cx='46' cy='50' r='6'>
							<animate
								attributeName='opacity'
								dur='1s'
								values='0;1;0'
								repeatCount='indefinite'
								begin='0.3'
							/>
						</circle>
					</Loader>
				</LoaderWrapper>
			</SelectorMenuWrapper>
		)
	}

	return (
		<SelectorMenuWrapper>
			{categories &&
				categories.map((category) => {
					const colorObj = _.find(
						colors,
						(color) => color.name === category.color
					)

					return (
						<PromptButton
							key={category.name}
							value={category.name}
							onClick={onClick}
							disabled={
								listStatus && listStatus[category.name] === 0
									? true
									: false
							}
							$color={colorObj?.value}
						>
							{category.title}
						</PromptButton>
					)
				})}
		</SelectorMenuWrapper>
	)
}

const SelectorMenuWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	width: 100%;
	border-bottom: 1px solid white;
	padding-bottom: 20px;
	margin-bottom: 20px;
`
const PromptButton = styled.button`
	background: ${(props) => props.$color || '#00bcd4'};
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 100%;
	box-sizing: border-box;
	width: 80px;
	height: 80px;
	color: white;
	line-height: 1.2em;
	padding: 2px 10px 0px;
	margin: 0px 10px 10px;
	cursor: pointer;
	outline: none;
	transition: transform ease-out 200ms;
	font-family: ${tokens.fontPrimary};

	&:hover {
		transform: scale(1.1) translate3d(0, 0, 0);
	}

	&:disabled {
		background-color: ${tokens.colorGrey};
		opacity: 0.6;

		&:hover {
			transform: scale(1) translate3d(0, 0, 0);
			color: white;
		}
	}
`
const LoaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`
const Loader = styled.svg`
	width: 100px;
	height: 100px;
	margin: 20px;
	display: inline-block;
`
const ReloadMsg = styled.div`
	font-size: 24px;
`

{
	/* Gooey Menu Test */
}
{
	/* <nav className="gooey-menu">
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
	</nav> */
}
{
	/* <!-- filters --> */
}
{
	/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
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
	</svg> */
}

// .prompt-menu {
// 	//vars
// 	$fg: #00bcd4;
// 	$bg: #673ab7;
// 	$pi: 3.14;

// 	//config
// 	$menu-items: 7;
// 	$open-distance: 105px;
// 	$opening-angle: $pi * 2;

// 	%goo {
// 		filter: url("#shadowed-goo");
// 		// debug
// 		//background:rgba(255,0,0,0.2);
// 	}
// 	%ball {
// 		background: $fg;
// 		border: none;
// 		border-radius: 100%;
// 		width: 80px;
// 		height: 80px;
// 		position: absolute;
// 		color: white;
// 		text-align: center;
// 		line-height: 80px;
// 		transition: transform ease-out 200ms;
// 		box-sizing: border-box;
// 		line-height: 1.2em;
// 		display: flex;
// 		justify-content: center;
// 		align-items: center;
// 		padding: 2px 10px 0px;
// 		cursor: pointer;
// 		outline: none;
// 		position: absolute;
// 		left: 50%;
// 		transform: translate3d(-50%, 0, 0);
// 	}

// 	.gooey-menu {
// 		@extend %goo;
// 		width: 100%;
// 		height: 100px;
// 		box-sizing: border-box;
// 		text-align: left;

// 		.menu-open {
// 			display: none;

// 			&:checked {
// 				+ .menu-open-button {
// 					transition-timing-function: linear;
// 					transition-duration: 200ms;
// 					transform: scale(0.8) translate3d(-50%, 0, 0);
// 				}

// 				~ .menu-item {
// 					transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);

// 					@for $i from 1 through $menu-items {
// 						&:nth-child(#{$i + 2}) {
// 							transition-duration: 90ms + (100ms * $i);
// 							transform: translate3d((140% * $i) - 600%, 120%, 0);
// 						}
// 					}
// 				}
// 			}
// 		}

// 		.menu-open-button {
// 			@extend %ball;
// 			z-index: 2;
// 			transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
// 			transition-duration: 0.4s;
// 			transform: scale(1) translate3d(-50%, 0, 0);
// 			cursor: pointer;

// 			&:hover {
// 				transform: scale(1.2) translate3d(-50%, 0, 0);
// 			}
// 		}

// 		.menu-item {
// 			@extend %ball;

// 			&:hover {
// 				background: white;
// 				color: $fg;
// 			}

// 			@for $i from 1 through $menu-items {
// 				&:nth-child(#{$i + 2}) {
// 					transition-duration: 180ms;
// 				}
// 			}
// 		}
// 	}

// 	svg {
// 		display: none;
// 	}
// }
