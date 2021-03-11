var firebaseConfig = {
    apiKey: "AIzaSyBS86ESDp5eMJSOjntWxZmmGtgKscNpchs",
    authDomain: "justrent-fff6d.firebaseapp.com",
    projectId: "justrent-fff6d",
    storageBucket: "justrent-fff6d.appspot.com",
    messagingSenderId: "319570124134",
    appId: "1:319570124134:web:ff0a75672a6dd4c14afca7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(); //add this to read and write