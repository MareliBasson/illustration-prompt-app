import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import PaperSizes from './data/paper-sizes.json'
import PaperFormats from './data/paper-formats.json'

export const Calculator = () => {
	const paperFormats = PaperFormats.paperFormats

	const [format, setFormat] = useState('block')
	const [comparisonEntries, setComparisonEntries] = useState([])

	return (
		<>
			<p>Select your paper format:</p>
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
							/>
							{paperFormat.label}
						</label>
						<br />
					</>
				)
			})}

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
		</>
	)
}

const ComparisonTable = ({ entries }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Size</th>
					<th>Price</th>
					<th>Number of Sheets</th>
					<th>Pricing Size</th>
					<th>Price per sheet</th>
					<th>Format</th>
				</tr>
			</thead>
			<tbody>
				{entries.map((entry) => {
					return (
						<tr>
							<td>{entry.size}</td>
							<td>{entry.price}</td>
							<td>{entry.numberOfSheets}</td>
							<td>{entry.pricingSize}</td>
							<td>{entry.pricePerSheet}</td>
							<td>{entry.format}</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

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
			<p>Select your block size:</p>
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
						/>
						{paperSize.name.toUpperCase()}
					</label>
				)
			})}
			<p>Number of sheets in block/pad:</p>
			<input
				{...register('numberOfSheets')}
				type='number'
				placeholder={0}
			/>

			<p>Price you paid:</p>
			<input {...register('price')} type='number' placeholder={0} />
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
			<br />
			<br />
			<input type='submit' />
		</form>
	)
}
