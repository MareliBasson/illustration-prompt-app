const firestoreService = require('firestore-export-import')
const serviceAccount = require('./serviceAccountKey.json')
// add serviceAccountKey.json to this folder
// generate new Private key from firebase: Settings -> Service Accounts

const databaseURL = process.env.REACT_APP_FIREBASE_DATABASEURL

firestoreService.initializeApp(serviceAccount, databaseURL)

const allCollectionsData = require('./collections-data.json')

const buildObj = (data) => {
	let colorArr = []
	let promptArr = []
	let categoryArr = []

	data.colors.forEach((color) => {
		colorArr.push({
			name: color.name,
			value: color.value,
		})
	})

	data.promptCollections.forEach((collection, index) => {
		collection.prompts.forEach((prompt) => {
			promptArr.push({
				category: collection.category,
				description: prompt,
				// imageUrl: '',
			})
		})

		// Colors are assigned in the sequence listed in the data structure
		categoryArr.push({
			color: colorArr[index].name,
			name: collection.category,
			title: collection.title,
			type: collection.type,
			visible: collection.visible,
		})
	})

	return { prompts: promptArr, categories: categoryArr, colors: colorArr }
}

firestoreService.restore(buildObj(allCollectionsData))

// to run script: $node uploadCollections

// Data structures
// const obj = {
//   prompts: [{ description: "", category: "", imageUrl: "" }],
//   colors: [{ name: "", value: "" }],
//   categories: [{ color: "", name: "", title: "" }],
// };
