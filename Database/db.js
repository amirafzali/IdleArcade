let firebaseConfig = {
    apiKey: "AIzaSyAI3uDiK0AuFj7_s-Q1tBQZdeCbUKVW-xo",
    authDomain: "idlearcade-c04ec.firebaseapp.com",
    projectId: "idlearcade-c04ec",
    storageBucket: "idlearcade-c04ec.appspot.com",
    messagingSenderId: "948764153496",
    appId: "1:948764153496:web:5740c18a7e6972d2c2e2ed"
};

// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);

var db = firebase.default.firestore();
var auth = firebase.default.auth();