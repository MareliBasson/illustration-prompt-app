const firestoreService = require('firestore-export-import')
const serviceAccount = require('./serviceAccountKey.json')
// add serviceAccountKey.json to this folder
// generate new Private key from firebase: Settings -> Service Accounts

const databaseURL = process.env.REACT_APP_FIREBASE_DATABASEURL

firestoreService.initializeApp(serviceAccount, databaseURL)

firestoreService.restore('prompts.json')

// to run script: $node uploadData
