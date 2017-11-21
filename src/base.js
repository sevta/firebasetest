import Rebase from 're-base'
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDwiSABOGO628yfTo-giB6pp6Jh1o4AAWQ",
    authDomain: "tesi-dad2a.firebaseapp.com",
    databaseURL: "https://tesi-dad2a.firebaseio.com",
    projectId: "tesi-dad2a",
    storageBucket: "tesi-dad2a.appspot.com",
    messagingSenderId: "1053322186669"
}
export const app = firebase.initializeApp(config)
export const base = Rebase.createClass(app.database())
export const gmail = new firebase.auth.GoogleAuthProvider()
export const db = firebase.database(app)