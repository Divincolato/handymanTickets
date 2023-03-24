
let tickets = { push: function push(element) { [].push.call(this, element) } };
//dati preimpostati per mettere qualcosa in localStorage

window.localStorage.setItem("tickets", JSON.stringify(tickets));


//elementi del dom 
  let addTicketButton = document.getElementById("add-ticket");
  
  let richiestaForm = document.getElementById("richiesta-form");

  let caricaDatiDefault = document.getElementById("caricaDatiDefault");

//eventListeners
  addTicketButton.addEventListener("click", () => {
      addTicket();
    }
  );
//metodo che carica dei dati di default (usato per localStorage)
  caricaDatiDefault.addEventListener("click", () => {
    try {tickets = [
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
      },{  categoria:"Pittura", ore: 3, dataSvolto:"2023-04-25", materialiUsati:"Pennelli",commentiIntervento:"Tutto ok"
    },{
      categoria:"Falegnameria", ore: 2, dataSvolto:"2023-03-12", materialiUsati:"Legno",commentiIntervento:"Tutto ok"
    },{
      categoria:"Elettrodomestici", ore: 5, dataSvolto:"2022-9-9", materialiUsati:"Microonde",commentiIntervento:"Tutto ok"
    }]
      }
    ];
      window.localStorage.setItem("tickets", JSON.stringify(tickets));
      window.alert("Dati caricati");
    } catch (error) {
      window.alert("Errore nel caricare i dati");
    }
      
      
      console.log(tickets);
    }
  );

//Funzione addNota() crea una nota vuota, popolandola con i dati inseriti da un cliente 
//per poi inserirla nei tickets ed inviando a localStorage l'array
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
  //TODO rifare con ciclo o HOfunc per non avere mille if
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
  //inserimento in tickets locale
  tickets.push(tmp);
  //push allo storage
  window.localStorage.setItem("tickets", JSON.stringify(tickets));
}

//funzione che non fa fare il submit alla form, da anche l'alert
//TODO inserire error check per verificare veramente il submit dei dati
function mySubmitFunction(e) {
    e.preventDefault();
    window.alert("Richiesta Inoltrata, verrai contattato il prima possibile.")
    return false;
  }