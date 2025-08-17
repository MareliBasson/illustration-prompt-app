import React from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'

import styled from 'styled-components'
import { tokens } from 'styles/tokens'

import { PromptSelectorMenu } from 'apps/art-prompter/selector/prompt-selector-menu'

export const PromptSelector = () => {
	const [selection, setSelection] = React.useState([])
	const [categories, setCategories] = React.useState([])
	const [colors, setColors] = React.useState([])
	const [allPrompts, setAllPrompts] = React.useState([])
	const [promptLists, setPromptLists] = React.useState()

	React.useEffect(() => {
		const db = firebase.firestore()

		db.collection('categories').onSnapshot((snapshot) => {
			const categoriesData = []
			snapshot.forEach((doc) => categoriesData.push(doc.data()))

			setCategories(categoriesData)
		})

		db.collection('colors').onSnapshot((snapshot) => {
			const colorsData = []
			snapshot.forEach((doc) => colorsData.push(doc.data()))

			setColors(colorsData)
		})

		db.collection('prompts').onSnapshot((snapshot) => {
			const promptsData = []
			snapshot.forEach((doc) =>
				promptsData.push({ ...doc.data(), id: doc.id })
			)

			setAllPrompts(promptsData)
		})

		setLists()
	}, [allPrompts.length])

	const setLists = () => {
		const categoryList = []
		categories.forEach((category) => {
			if (category.name !== '') {
				categoryList.push(category.name)
			}
		})

		const categoryObj = {}
		categoryList.forEach(
			(category) =>
				(categoryObj[category] = _.filter(allPrompts, {
					category: category,
				}))
		)

		setPromptLists(categoryObj)
	}

	const onSelect = (e) => {
		const selectedValue = e.target.value

		if (!_.isEmpty(promptLists)) {
			const randomNr = Math.floor(
				Math.random() * promptLists[selectedValue]?.length
			)
			const selectionResult = promptLists[selectedValue][randomNr]
			const updateSelectedList = promptLists[selectedValue].filter(
				(val, index) => index !== randomNr
			)

			setSelection(selection.concat(selectionResult))
			setPromptLists({
				...promptLists,
				[selectedValue]: updateSelectedList,
			})
		}
	}

	const clear = () => {
		setSelection([])
		setLists()
	}

	const takeScreenshot = () => {
		// Use html2canvas to capture the current viewport
		import('html2canvas')
			.then((html2canvas) => {
				html2canvas
					.default(document.body, {
						useCORS: true,
						allowTaint: true,
						backgroundColor: '#121236', // Match the app's background color
						scale: 1, // Higher quality
						width: window.innerWidth,
						height: window.outerHeight,
						logging: false, // Disable console logging
						ignoreElements: (element) => {
							// Ignore the screenshot button itself to avoid recursion
							return element.classList.contains(
								'screenshot-button'
							)
						},
					})
					.then((canvas) => {
						// Create download link
						const link = document.createElement('a')
						const timestamp = new Date()
							.toISOString()
							.slice(0, 19)
							.replace(/:/g, '-')
						link.download = `prompt-selection-${timestamp}.png`
						link.href = canvas.toDataURL('image/png', 0.9)
						document.body.appendChild(link)
						link.click()
						document.body.removeChild(link)
					})
					.catch((error) => {
						console.error('Screenshot failed:', error)
						alert('Failed to take screenshot. Please try again.')
					})
			})
			.catch((error) => {
				console.error('Failed to load html2canvas:', error)
				alert(
					'Screenshot feature not available. Please install html2canvas.'
				)
			})
	}

	const getListStatus = () => {
		const statusObj = {}

		if (categories && promptLists) {
			categories.forEach((category) => {
				if (promptLists[category.name]) {
					statusObj[category.name] = promptLists[category.name].length
				}
			})
		}

		return statusObj
	}

	const removeCard = (prompt) => {
		setPromptLists({
			...promptLists,
			[prompt.category]: promptLists[prompt.category].concat(prompt),
		})
		setSelection(
			selection.filter((val) => {
				return val.id !== prompt.id
			})
		)
	}

	const visibleCategories = categories.filter((category) => category.visible)

	return (
		<div>
			<PromptSelectorMenu
				onClick={onSelect}
				categories={visibleCategories}
				listStatus={getListStatus()}
				colors={colors}
			/>

			<div>
				{selection.length > 0 && (
					<PromptGrid
						selection={selection}
						removeCard={removeCard}
						categories={categories}
						colors={colors}
					/>
				)}
			</div>

			<ClearPrompts onClick={clear} className='clear-prompt-button'>
				<i className='fa fa-trash'></i> <span>Clear Selection</span>
			</ClearPrompts>

			<ScreenshotButton
				onClick={takeScreenshot}
				className='screenshot-button'
			>
				<i className='fa fa-camera'></i> <span>Screenshot</span>
			</ScreenshotButton>
		</div>
	)
}

const ClearPrompts = styled.div`
	position: fixed;
	z-index: 1000;
	right: -126px;
	width: 180px;
	height: 80px;
	top: 45%;
	background-color: ${tokens.colorRed};
	border-radius: 80px 0% 0 80px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	text-align: right;
	padding: 10px 10px 10px 20px;
	transition: right 0.2s ease;
	cursor: pointer;
	box-sizing: border-box;

	i {
		font-size: 26px;
		margin-right: 26px;
	}
	span {
		font-size: 1.2rem;
	}
	&:hover {
		right: 0px;
		transition: right 0.2s ease;
	}

	@media (max-width: 768px) {
		padding: 0px;
		height: 40px;
		width: 40px;
		top: 10px;
		left: 20px;
		right: auto;
		border-radius: 80px;
		justify-content: center;
		align-items: center;
		text-align: center;
		i {
			font-size: 20px;
			margin: 0;
		}
		span {
			display: none;
		}
	}
`

const ScreenshotButton = styled.div`
	position: fixed;
	z-index: 1000;
	right: -126px;
	width: 180px;
	height: 80px;
	top: 30%;
	background-color: ${tokens.colorBlue};
	border-radius: 80px 0% 0 80px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	text-align: right;
	padding: 10px 10px 10px 20px;
	transition: right 0.2s ease;
	cursor: pointer;
	box-sizing: border-box;

	i {
		font-size: 26px;
		margin-right: 26px;
	}
	span {
		font-size: 1.2rem;
	}
	&:hover {
		right: 0px;
		transition: right 0.2s ease;
	}

	@media (max-width: 768px) {
		padding: 0px;
		height: 40px;
		width: 40px;
		top: 10px;
		left: 70px;
		border-radius: 80px;
		justify-content: center;
		align-items: center;
		text-align: center;
		i {
			font-size: 20px;
			margin: 0;
		}
		span {
			display: none;
		}
	}
`

const PromptGrid = ({ selection, removeCard, categories, colors }) => {
	return (
		<PromptGridWrapper>
			{selection.map((prompt, index) => {
				const categoryObj = _.find(
					categories,
					(category) => category.name === prompt.category
				)

				const colorObj = _.find(
					colors,
					(color) => color.name === categoryObj.color
				)

				return (
					<PromptCard
						key={`prompt-${index}`}
						$color={colorObj?.value}
					>
						<DeleteCard
							onClick={() => {
								removeCard(prompt)
							}}
						>
							<i className='fa fa-times'></i>
						</DeleteCard>
						{/* <div className="image">
							<img src={prompt.imageUrl ? prompt.imageUrl : 'images/placeholder.png'} alt="" />
						</div> */}
						<CardTitle>{prompt.description}</CardTitle>
						<CardCategory>{prompt.category}</CardCategory>
					</PromptCard>
				)
			})}
		</PromptGridWrapper>
	)
}

const PromptGridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	grid-auto-rows: 1fr;
	column-gap: 10px;
	row-gap: 15px;

	@media (max-width: 768px) {
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	}
`
const PromptCard = styled.div`
	position: relative;
	background-color: white;
	color: ${tokens.colorPrimary};
	text-align: center;
	border: 5px solid
		${(props) => props.$color || lighten(0.3, tokens.colorPrimary)};
	border-radius: 10px;
	padding: 30px 20px 0px;
	display: grid;
	align-items: center;
	grid-template-rows: 1fr 40px 30px;
	grid-template-areas: 'description' 'category';

	@media (max-width: 768px) {
		padding: 36px 10px 0px;
	}
`
const DeleteCard = styled.div`
	position: absolute;
	top: 8px;
	right: 15px;
	font-size: 26px;
	cursor: pointer;

	&:hover {
		color: ${tokens.colorRed};
	}

	@media (max-width: 768px) {
		top: 5px;
		right: 10px;
		font-size: 20px;
	}
`
const CardTitle = styled.div`
	grid-area: description;
	font-size: 1.5rem;
	text-transform: lowercase;
`

const CardCategory = styled.div`
	grid-area: category;
	font-size: 1rem;
	text-transform: uppercase;
	font-style: italic;
`
