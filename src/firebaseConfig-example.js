import firebase from 'firebase'

const config = {
	apiKey: 'API KEY',
	authDomain: 'DOMAIN',
	databaseURL: 'URL',
	projectId: 'ID',
	storageBucket: 'BUCKET',
	messagingSenderId: 'SENDER ID',
	appId: 'APP ID',
}
// Initialize Firebase
firebase.initializeApp(config)

export default firebase
