
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

const dbRef = collection(db, "tickets");

export function add(ticket){
addDoc(dbRef, ticket)
.then(docRef => {
    console.log("Document has been added successfully");
    window.alert("Document has been added successfully");
})
.catch(error => {
    console.log(error);
    window.alert("Errore nell'aggiungere la richiesta");
})};
/*
try {
  const docRef = await addDoc(collection(db, "tickets"), tickets[1]);
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}*/
const querySnapshot = await getDocs(collection(db, "tickets"));

let ticket;
let tickets= [];
let index= 0;
export function get() {
  
querySnapshot.forEach((doc) => {
  console.log("dentro a call"+index);
  tickets[index]= doc.data();
  index++;
});

return tickets;
}

;
