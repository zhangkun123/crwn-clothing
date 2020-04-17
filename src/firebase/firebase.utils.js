import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =   {
    apiKey: "AIzaSyAZf5QyiqTvbyEskanSAH_nLjeK68WC8bQ",
    authDomain: "crwn-db-63a5e.firebaseapp.com",
    databaseURL: "https://crwn-db-63a5e.firebaseio.com",
    projectId: "crwn-db-63a5e",
    storageBucket: "crwn-db-63a5e.appspot.com",
    messagingSenderId: "885268312704",
    appId: "1:885268312704:web:025a80d3093824d21eec65",
    measurementId: "G-7FP7R2LWMY"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    console.log(snapShot);
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;