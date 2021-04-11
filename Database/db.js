// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAI3uDiK0AuFj7_s-Q1tBQZdeCbUKVW-xo",
    authDomain: "idlearcade-c04ec.firebaseapp.com",
    projectId: "idlearcade-c04ec",
    storageBucket: "idlearcade-c04ec.appspot.com",
    messagingSenderId: "948764153496",
    appId: "1:948764153496:web:6f06f01ee5877928c2e2ed"
};
// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);

var db = firebase.default.firestore();
var auth = firebase.default.auth();