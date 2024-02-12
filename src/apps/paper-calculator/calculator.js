import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import PaperSizes from './data/paper-sizes.json'
import PaperFormats from './data/paper-formats.json'

export const Calculator = () => {
	const paperFormats = PaperFormats.paperFormats

	const [format, setFormat] = useState('block')
	const [comparisonEntries, setComparisonEntries] = useState([])

	return (
		<CalculatorWrapper>
			<Row>
				<p>Select your paper format:</p>
				<div>
					{paperFormats.map((paperFormat) => {
						return (
							<>
								<label
									htmlFor={`field-${paperFormat.name}`}
									key={paperFormat.name}
								>
									<input
										type='radio'
										value={paperFormat.name}
										id={`field-${paperFormat.name}`}
										onChange={(e) => {
											setFormat(e.target.value)
										}}
										checked={format === paperFormat.name}
									/>{' '}
									{paperFormat.label}{' '}
								</label>
							</>
						)
					})}
				</div>
			</Row>
			{format === 'block' && (
				<BlockForm
					setComparisonEntries={setComparisonEntries}
					comparisonEntries={comparisonEntries}
					format={format}
				/>
			)}

			{Boolean(comparisonEntries.length) && (
				<ComparisonTable entries={comparisonEntries} />
			)}
		</CalculatorWrapper>
	)
}

const CalculatorWrapper = styled.div`
	font-size: 1.2rem;
	width: 100%;
	background-color: darkslateblue;
	padding: 10px 20px 30px;
	p {
		margin: 15px 0;
	}
`
const Row = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
`

const BlockForm = ({ setComparisonEntries, comparisonEntries }) => {
	const { register, handleSubmit } = useForm()
	const paperSizes = PaperSizes.paperSizes
	const [size, setSize] = useState('a3')
	const [pricingSize, setPricingSize] = useState()
	const [multiplier, setMultiplier] = useState(1)

	const onSubmit = (data) => {
		const calculatedNrOfSheets =
			data.pricingSize !== data.blockSize
				? data.numberOfSheets * 2 ** multiplier
				: data.numberOfSheets

		setComparisonEntries(
			comparisonEntries.concat({
				size: data.blockSize.toUpperCase(),
				price: Number(data.price).toFixed(2),
				numberOfSheets: calculatedNrOfSheets,
				pricingSize: data.pricingSize.toUpperCase(),
				pricePerSheet: (data.price / calculatedNrOfSheets).toFixed(2),
				format: data.format,
				description: data.description,
			})
		)
	}

	const pricingSizes = paperSizes.slice(
		0,
		paperSizes.map((e) => e.name).indexOf(size)
	)

	const handlePricingSizeSelect = (e) => {
		const value = e.target.value
		if (value !== size) {
			setPricingSize(value)
		} else {
			setPricingSize()
		}
	}

	const calculateMultiplier = () => {
		if (pricingSize) {
			const sizeMultiplier = paperSizes?.find(
				(e) => e.name === size
			).multiplier
			const pricingSizeMultiplier = paperSizes?.find(
				(e) => e.name === pricingSize
			).multiplier

			setMultiplier(pricingSizeMultiplier - sizeMultiplier)
		} else {
			setMultiplier(1)
		}
	}

	useEffect(() => {
		calculateMultiplier()
	}, [pricingSize, size])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Row>
				<p>Select your block size:</p>
				<div>
					{paperSizes.map((paperSize) => {
						return (
							<label
								key={paperSize.name}
								htmlFor={`field-${paperSize.name}`}
							>
								<input
									{...register('blockSize')}
									type='radio'
									value={paperSize.name}
									id={`field-${paperSize.name}`}
									onChange={(e) => {
										setSize(e.target.value)
									}}
									checked={size === paperSize.name}
								/>{' '}
								{paperSize.name.toUpperCase()}{' '}
							</label>
						)
					})}
				</div>
			</Row>

			<Row>
				<p>Size of sheet for pricing:</p>
				<select
					{...register('pricingSize')}
					onChange={(e) => handlePricingSizeSelect(e)}
					defaultValue={size}
				>
					<option value={size}>{size.toUpperCase()}</option>
					{pricingSizes.reverse().map((priceSize) => {
						return (
							<option key={priceSize.name} value={priceSize.name}>
								{priceSize.name.toUpperCase()}
							</option>
						)
					})}
				</select>
			</Row>

			<Row>
				<p>Price you paid:</p>
				<input {...register('price')} type='number' placeholder={0} />
			</Row>

			<Row>
				<p>Number of sheets in block/pad:</p>
				<input
					{...register('numberOfSheets')}
					type='number'
					placeholder={0}
				/>
			</Row>

			<Row>
				<p>Description:</p>
				<input
					{...register('description')}
					type='text'
					placeholder={'eg. Montval 100% Cotton'}
				/>
			</Row>
			<ButtonRow>
				<input type='submit' />
			</ButtonRow>
		</form>
	)
}

const ButtonRow = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 30px;
`

const ComparisonTable = ({ entries }) => {
	return (
		<ComparisonTableWrapper>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Price</th>
						<th>Size</th>
						<th>Pricing Size</th>
						<th>Amount of sheets</th>
						<th>Price per sheet</th>
					</tr>
				</thead>
				<tbody>
					{entries.map((entry) => {
						return (
							<tr>
								<td>{entry.description}</td>
								<td>{entry.price}</td>
								<td>{entry.size}</td>
								<td>{entry.pricingSize}</td>
								<td>{entry.numberOfSheets}</td>
								<td>{entry.pricePerSheet}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</ComparisonTableWrapper>
	)
}

const ComparisonTableWrapper = styled.div`
	margin-top: 30px;
	table {
		width: 100%;
		border-collapse: collapse;
	}
	th,
	td {
		text-align: left;
		border: 1px solid white;
		padding: 10px;
	}
`
