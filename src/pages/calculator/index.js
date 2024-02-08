// import logo from './logo.svg'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import PaperSizes from './data/paper-sizes.json'
import PaperFormats from './data/paper-formats.json'

export const Calculator = () => {
	const paperSizes = PaperSizes.paperSizes
	const paperFormats = PaperFormats.paperFormats

	const { register, handleSubmit } = useForm()
	const [format, setFormat] = useState('block')
	const [size, setSize] = useState('a3')
	const [total, setTotal] = useState()
	const [pricingSize, setPricingSize] = useState()
	const [multiplier, setMultiplier] = useState(1)
	const [numberOfSheets, setNumberOfSheets] = useState()

	const [comparisonEntries, setComparisonEntries] = useState([])

	const onSubmit = (data) => {
		const calculatedNrOfSheets = Boolean(data.pricingSize)
			? data.numberOfSheets * 2 ** multiplier
			: data.numberOfSheets

		setComparisonEntries(
			comparisonEntries.concat({
				size: data.blockSize?.toUpperCase(),
				price: data.price,
				numberOfSheets: calculatedNrOfSheets,
				pricingSize: (data.size ?? data.pricingSize).toUpperCase(),
				total: (data.price / calculatedNrOfSheets).toFixed(2),
				format: data.format,
			})
		)
	}

	console.log(comparisonEntries)

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
	}, [pricingSize])

	return (
		<>
			{/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<p>Select your paper format:</p>
				{paperFormats.map((paperFormat) => {
					return (
						<>
							<label
								htmlFor={`field-${paperFormat.name}`}
								key={paperFormat.name}
							>
								<input
									{...register('format')}
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
					<>
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
					</>
				)}
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

			{Boolean(comparisonEntries.length) && (
				<table>
					<tr>
						<th>Size</th>
						<th>Price</th>
						<th>Number of Sheets</th>
						<th>Pricing Size</th>
						<th>Total</th>
						<th>Format</th>
					</tr>
					{comparisonEntries.map((entry) => {
						return (
							<tr>
								<td>{entry.size}</td>
								<td>{entry.price}</td>
								<td>{entry.numberOfSheets}</td>
								<td>{entry.pricingSize}</td>
								<td>{entry.total}</td>
								<td>{entry.format}</td>
							</tr>
						)
					})}
				</table>
			)}
		</>
	)
}
