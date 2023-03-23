
import  { add, get } from 'https://divincolato.github.io/src/file.js';
  //funzione che non fa fare il submit alla form, da anche l'alert
//TODO inserire error check per verificare veramente il submit dei dati


let tickets= get();
 

//elementi del dom 

  let addTicketButton = document.getElementById("add-ticket");
  
  let richiestaForm = document.getElementById("richiesta-form");


//eventListeners
  addTicketButton.addEventListener("click", () => {
    //se la form non è valida faccio il return
    if(!richiestaForm.reportValidity()){return;}
      else{
        //se la form è valida invio il ticket a firestore e resetto la form
      addTicket();
      richiestaForm.reset();}
    }
  );


//Funzione addTicket() crea un ticket vuoto, popolandolo con i dati inseriti da un cliente 
//per poi inserirla nei tickets ed inviando a firebase il ticket
function addTicket() {
  let tmp = 
    {nome: "",
    cognome: "",
    indirizzo: "",
    lavoratore: "Da Assegnare",
    dataSubmit: new Date(),
    completato: false,
    interventi:[]
    }
  ;
  //ciclo per checkbox per checkbox, popola tipoIntervento
  for(let i=1; i<=8; i++){
    if (window.document.getElementById("checkbox"+i).checked){
      
    tmp.interventi.push({categoria: window.document.getElementById("checkbox"+i).value, ore: 0, dataSvolto:"", materialiUsati:"",commentiIntervento:""})
    }
  }

  //dati rimanenti inseriti dall'utente
  
  tmp.descrizioneIntervento = richiestaForm.descrizioneIntervento.value;
  tmp.indirizzo = richiestaForm.Indirizzo.value;
  tmp.nome = richiestaForm.nome.value;
  tmp.cognome = richiestaForm.cognome.value;
  tmp.contatti = richiestaForm.contatti.value;
  //chiamata a metodo add di firebase
  add(tmp);
}

