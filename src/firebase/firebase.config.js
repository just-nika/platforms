import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBVCOJoqKeuNIvMoqYVS99a5BU2jyqK_Po",
    authDomain: "platforms-58036.firebaseapp.com",
    projectId: "platforms-58036",
    storageBucket: "platforms-58036.appspot.com",
    messagingSenderId: "728600321818",
    appId: "1:728600321818:web:5cfb3c690e73f5654816a3"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();

export {
    firebaseConfig,
    firestore,
    auth,
    firebase
}