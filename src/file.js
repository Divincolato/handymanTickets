import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js'
import { getFirestore, addDoc, collection, getDocs, updateDoc, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

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
const auth = getAuth(app);
export const user = null;



  
export function logIn(email, password){
  
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // se l'utente è l'admin mando alla sua pagina, altrimenti mando a lavoratore
    // sarebbe da fare utilizzando permessi di firestore e bloccando le pagine in modo che un utente non loggato 
    //non possa scrivere l'indirizzo della pagina ed accedere comunque
    window.localStorage.setItem("email", user.email);
    window.location.href = (user.email === 'admin@handyman.com') ? './admin.html' : './lavoratore.html';
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error.message)
    window.alert("Errore nell'effettuare il login: "+error.message);
  });
}
export function logOut(){

  signOut(auth).then(() => {
  // Sign-out successful. 
  window.alert("Logout effettuato. Verrai reindirizzato alla pagina iniziale");
  window.location.href = ("./index.html");
  return;
}).catch((error) => {
  // An error happened.
    const errorMessage = error.message;
    console.log(error.message)
    window.alert("Errore nell'effettuare il logout: "+error.message);
});}
;
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


