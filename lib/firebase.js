import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDjbhnTBrWVr3JTVnExfmO_LnQDuLFZZmE",
  authDomain: "url-shrinker-c35c1.firebaseapp.com",
  projectId: "url-shrinker-c35c1",
  storageBucket: "url-shrinker-c35c1.appspot.com",
  messagingSenderId: "971147446141",
  appId: "1:971147446141:web:e5b8cfb8f112136f34ae14",
  measurementId: "G-6904RZXXTW"
};

try {
    firebase.initializeApp(firebaseConfig);
  } catch(err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
}

const fire = firebase.firestore();
export default fire;