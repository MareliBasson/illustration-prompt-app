const firestoreService = require('firestore-export-import')
const serviceAccount = require('./serviceAccountKey.json')
// add serviceAccountKey.json to this folder
// generate new Private key from firebase: Settings -> Service Accounts

const databaseURL = process.env.REACT_APP_FIREBASE_DATABASEURL

firestoreService.initializeApp(serviceAccount, databaseURL)

const allCollectionsData = require('./collections-data.json')

const buildObj = (data) => {
	let promptArr = []

	let typeArr = []

	data.promptCollections.forEach((collection) => {
		collection.prompts.forEach((prompt) => {
			promptArr.push({
				type: collection.type,
				description: prompt,
				imageUrl: '',
			})
		})

		typeArr.push({
			color: collection.color,
			name: collection.type,
			title: collection.title,
		})
	})

	let colorArr = []

	data.colors.forEach((color) => {
		colorArr.push({
			name: color.name,
			value: color.value,
		})
	})

	return { prompts: promptArr, types: typeArr, colors: colorArr }
}

firestoreService.restore(buildObj(allCollectionsData))

// to run script: $node uploadData

// Data structures
// const obj = {
//   prompts: [{ description: "", imageUrl: "", type: "" }],
//   colors: [{ name: "", value: "" }],
//   types: [{ color: "", name: "", title: "" }],
// };
