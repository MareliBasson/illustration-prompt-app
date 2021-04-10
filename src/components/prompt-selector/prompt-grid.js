import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { tokens } from 'styles/variables'
import { lighten } from 'polished'

const PromptGrid = ({ selection, removeCard, categories, colors }) => {
	return (
		<PromptGridWrapper>
			{selection.map((prompt, index) => {
				const categoryObj = _.find(categories, (category) => category.name === prompt.category)

				const colorObj = _.find(colors, (color) => color.name === categoryObj.color)

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
							<i className="fa fa-times"></i>
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

	@media (max-width: 552px) {
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}
`
const PromptCard = styled.div`
	position: relative;
	background-color: white;
	color: ${tokens.colorPrimary};
	text-align: center;
	border: 5px solid ${props=> props.$color || lighten(0.3, tokens.colorPrimary)};
	border-radius: 10px;
	padding: 30px 20px 20px;
	display: grid;
	align-items: center;
	grid-template-rows: 1fr 40px 30px;
	grid-template-areas: 'description' 'category';
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


export default PromptGrid
