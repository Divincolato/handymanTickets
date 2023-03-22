
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js'
			  
// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'
import { getFirestore, addDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'
import { ref, getDatabase, set } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js'
const firebaseConfig = {

apiKey: "AIzaSyDoaW1EppKyx4zXTsIAN5Lr32mulHISbzM",

authDomain: "handymantickets-15266.firebaseapp.com",

projectId: "handymantickets-15266",
databaseURL: "https://handymantickets-15266-default-rtdb.firebaseio.com",
storageBucket: "handymantickets-15266.appspot.com",

messagingSenderId: "338544044418",

appId: "1:338544044418:web:062317dbd635242877879b"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

const querySnapshot = await getDocs(collection(db, "users"));

querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});
console.log(querySnapshot.data());