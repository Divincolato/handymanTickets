import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js'
			  
// Add Firebase products that you want to use
import { getFirestore, addDoc, collection, getDocs, updateDoc, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'

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

//funzione che aggiunge un ticket a firestore, 
export function add(ticket){
addDoc(dbRef, ticket)
.then(docRef => {
  let data= {id: docRef.id};  
  let docRef2 = doc(db, "tickets", docRef.id);
  
  //aggiungo il docId univoco del ticket al ticket stesso così da poterlo richiamare singolarmente e modificare
  //senza dover scaricare ogni volta tutta la collection
  updateDoc(docRef2, data)
  .then(docRef3 => {
  })
  .catch(error => {
      console.log(error);
  }) 
        window.alert("La tua richiesta è stata inoltrata con successo, verrai contattato il prima possibile");
})
.catch(error => {
    console.log(error);
    window.alert("Errore nell'aggiungere la richiesta, riprova");
})};
//funzione usata per modificare un ticket quando paul o i dipendenti agiscono sui ticket
export function update(ticket){
  const ticketRef = doc(db, 'tickets', ticket.id);
  updateDoc(ticketRef, ticket).then(docRef => {
})
.catch(error => {
    console.log(error);
})}
//get della collection asincrono
const querySnapshot = await getDocs(collection(db, "tickets"));

let tickets= [];
let index= 0;

//funzione get che cicla ogni documento nella querysnapshot e scarica ogni ticket da firestore
export function get() {
  
querySnapshot.forEach((doc) => {
  tickets[index]= doc.data();
  index++;
});

return tickets;
}

;
