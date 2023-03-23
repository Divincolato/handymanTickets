
import  { add, get } from './file.js';
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
    completato: false,
    interventi:[]
    }
  ;
  //serie di if per checkbox, popola tipoIntervento
  //TODO rifare con ciclo for e id dinamici per non avere mille if
  if(richiestaForm.Edile.checked){
    tmp.interventi.push({categoria:"Edile", ore: 0, dataSvolto:"", materialiUsati:"",commentiIntervento:""});
  }
  if(richiestaForm.Elettrico.checked){
    tmp.interventi.push({categoria:"Elettrico", ore: 0, dataSvolto:"", materialiUsati:"",commentiIntervento:""});
  }
  if(richiestaForm.Falegname.checked){
    tmp.interventi.push({categoria:"Falegname", ore: 0, dataSvolto:"", materialiUsati:"",commentiIntervento:""});
  }
  if(richiestaForm.Idraulico.checked){
    tmp.interventi.push({categoria:"Idraulico", ore: 0, dataSvolto:"", materialiUsati:"",commentiIntervento:""});
  }
  if(richiestaForm.Serramenti.checked){
    tmp.interventi.push({categoria:"Serramenti", ore: 0, dataSvolto:"", materialiUsati:"",commentiIntervento:""});
  }
  if(richiestaForm.Tinteggiatura.checked){
    tmp.interventi.push({categoria:"Tinteggiatura", ore: 0, dataSvolto:"", materialiUsati:"",commentiIntervento:""});
  }
  if(richiestaForm.Facchinaggio.checked){
    tmp.interventi.push({categoria:"Facchinaggio", ore: 0, dataSvolto:"", materialiUsati:"",commentiIntervento:""});
  }
  if(richiestaForm.Altro.checked){
    tmp.interventi.push({categoria:"Altro", ore: 0, dataSvolto:"", materialiUsati:"",commentiIntervento:""});
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

