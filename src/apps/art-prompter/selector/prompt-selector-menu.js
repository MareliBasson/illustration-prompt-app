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
	max-width: 800px;
	margin: 0 auto 20px;
	border-bottom: 1px solid white;
	padding-bottom: 20px;

	@media (max-width: 768px) {
		max-width: 100%;
		padding: 0 10px 20px;
	}
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

	@media (max-width: 768px) {
		width: 70px;
		height: 70px;
		margin: 0px 5px 10px;
		padding: 2px 8px 0px;
		font-size: 0.9em;
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
