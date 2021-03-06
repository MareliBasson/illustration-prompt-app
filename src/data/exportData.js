const firestoreService = require('firestore-export-import')
const serviceAccount = require('./serviceAccountKey.json')
// add serviceAccountKey.json to this folder
// generate new Private key from firebase: Settings -> Service Accounts

const databaseURL = process.env.REACT_APP_FIREBASE_DATABASEURL

firestoreService.initializeApp(serviceAccount, databaseURL)

// function download(content, fileName, contentType) {
//   var a = document.createElement("a");
//   var file = new Blob([content], { type: contentType });
//   a.href = URL.createObjectURL(file);
//   a.download = fileName;
//   a.click();
// }
// download(jsonData, "json.txt", "text/plain");

firestoreService.backup(['prompts', 'colors', 'types']).then((collections) => {
	console.log(JSON.stringify(collections))
})

// to run script: $node uploadData
