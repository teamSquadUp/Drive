import firebase from 'firebase'
import apiConfig from './apiKeys'

const config = {
    apiKey: apiConfig.apiKey,
    authDomain: "swiperrrrrr.firebaseapp.com",
    databaseURL: "https://swiperrrrrr.firebaseio.com",
    projectId: "swiperrrrrr",
    storageBucket: "swiperrrrrr.appspot.com",
    messagingSenderId: "697158645393"
};
firebase.initializeApp(config);

//exports the auth module of Firebase + Google auth provider  


export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase; 

 
