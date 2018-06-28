import firebase from 'firebase'
import apiConfig from './apiKeys'

const config = {
    apiKey: apiConfig.apiKey,
    authDomain: apiConfig.authDomain, 
    databaseURL: apiConfig.databaseURL,
    projectId:apiConfig.projectId,
    storageBucket: apiConfig.storageBucket,
    messagingSenderId: apiConfig.messagingSenderId
};
firebase.initializeApp(config);

//exports the auth module of Firebase + Google auth provider  


export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase; 

 
