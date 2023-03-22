import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js'
			  
// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'
import { getFirestore, addDoc, collection, getDocs, updateDoc, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'
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

let tickets2 = { push: function push(element) { [].push.call(this, element) } };
tickets2 = [
  {
  nome: "Germano",
  cognome: "Parvetti",
  indirizzo: "via Pave 9, Trento(TN)",
  descrizioneIntervento: "Cambiare infissi",
  contatti:"333-6658452",
    lavoratore: "Da Assegnare",
    completato: true,
  interventi:[{
      categoria:"Pittura", ore: 3, dataSvolto:"2023-04-25", materialiUsati:"Pennelli",commentiIntervento:"Tutto ok"
    },{
      categoria:"Falegnameria", ore: 2, dataSvolto:"2023-03-12", materialiUsati:"Legno",commentiIntervento:"Tutto ok"
    },{
      categoria:"Elettrodomestici", ore: 5, dataSvolto:"2022-9-9", materialiUsati:"Microonde",commentiIntervento:"Tutto ok"
    }]
  },
  {
  nome: "Paolo",
  cognome: "Bassi",
  indirizzo: "via Bettini 29, Rovereto(CA)",
  descrizioneIntervento: "Pittura soffitti, Cambio prese",
  contatti:"333-6653432",
    lavoratore: "Luigi",
    completato: false,
  interventi:[{
    categoria:"Pittura", ore: 3, dataSvolto:"2023-04-25", materialiUsati:"Pennelli",commentiIntervento:"Tutto ok"
  },{
    categoria:"Falegnameria", ore: 2, dataSvolto:"2023-03-12", materialiUsati:"Legno",commentiIntervento:"Tutto ok"
  },{
    categoria:"Elettrodomestici", ore: 5, dataSvolto:"2022-9-9", materialiUsati:"Microonde",commentiIntervento:"Tutto ok"
  },{  
    categoria:"Pittura", ore: 3, dataSvolto:"2023-04-25", materialiUsati:"Pennelli",commentiIntervento:"Tutto ok"
},{
  categoria:"Falegnameria", ore: 2, dataSvolto:"2023-03-12", materialiUsati:"Legno",commentiIntervento:"Tutto ok"
},{
  categoria:"Elettrodomestici", ore: 5, dataSvolto:"2022-9-9", materialiUsati:"Microonde",commentiIntervento:"Tutto ok"
}]
  }
];

//add(tickets2[0]);
//add(tickets2[1]);

export function add(ticket){
addDoc(dbRef, ticket)
.then(docRef => {
  let data= {id: docRef.id};  
  console.log(docRef.id)
  let docRef2 = doc(db, "tickets", docRef.id);
  updateDoc(docRef2, data)
  .then(docRef3 => {
      console.log("A New Document Field has been added to an existing document");
  })
  .catch(error => {
      console.log(error);
  }) 
        window.alert("Document has been added successfully"+docRef.id);
})
.catch(error => {
    console.log(error);
    window.alert("Errore nell'aggiungere la richiesta");
})};

export function update(ticket){
  const ticketRef = doc(db, 'tickets', ticket.id);
  updateDoc(ticketRef, ticket).then(docRef => {
    console.log("A New Document Field has been added to an existing document");
})
.catch(error => {
    console.log(error);
})}

const querySnapshot = await getDocs(collection(db, "tickets"));

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
