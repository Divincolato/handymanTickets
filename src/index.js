
let tickets = { push: function push(element) { [].push.call(this, element) } };
//dati preimpostati per metter qualcosa in localStorage
tickets = [
      { cliente: "Gigio",
        tipoIntervento: [{"Edile":5},{"Elettrico":3},{"Idraulico":3},{"Serramenti":3}],
        descrizioneIntervento: "eretgs est erstg rst sets et",
        indirizzo:"wudnuwdnuwdn via v 3343",
        data: "2023-03-17",
        lavoratore: "Mario",
        materialiImpiegati: ["cemento", "piastrelle"],
        completato: true
      },
      {cliente: "Gigio",
        tipoIntervento: [{"Edile":5},{"Elettrico":3}],
        descrizioneIntervento: "eretgs est erstg rst sets et",
        indirizzo:"wudnuwdnuwdn via v 3343",
        data: "2023-03-18",
        lavoratore: "Luigi",
        materialiImpiegati: ["cavi", "prese"],
        completato: false
      },
      {cliente: "Gigio",
        tipoIntervento: [{"Edile":5},{"Elettrico":3}],
        descrizioneIntervento: "eretgs est erstg rst sets et",
        indirizzo:"wudnuwdnuwdn via v 3343",
        data: "2023-03-19",
        lavoratore: "Mario",
        materialiImpiegati: ["legno", "chiodi"],
        completato: false
      }]
  ;
  
//elementi del dom 
  let addNotaButton = document.getElementById("add-nota");
  
  let richiestaForm = document.getElementById("richiesta-form");

  let caricaDatiDefault = document.getElementById("caricaDatiDefault");

//eventListeners
  addNotaButton.addEventListener("click", () => {
      addNota();
    }
  );
  caricaDatiDefault.addEventListener("click", () => {
      window.localStorage.setItem("tickets", JSON.stringify(tickets));
      window.alert("Dati caricati");
      console.log(tickets);
    }
  );

//Funzione addNota() crea una nota vuota, popolandola con i dati inseriti da un cliente 
//per poi inserirla nei tickets ed inviando a localStorage l'array
function addNota() {
  let tmp = {
        tipoIntervento: [],
        descrizioneIntervento: "",
        indirizzo:"",
        data: "",
        lavoratore: "",
        materialiImpiegati: [],
        completato: false,
  };
  //serie di if per checkbox, popola tipoIntervento
  //TODO rifare con ciclo o HOfunc per non avere mille if
  if(richiestaForm.Edile.checked){
    tmp.tipoIntervento.push({"Edile":0});
  }
  if(richiestaForm.Elettrico.checked){
    tmp.tipoIntervento.push({"Elettrico":0});
  }
  if(richiestaForm.Falegname.checked){
    tmp.tipoIntervento.push({"Falegname":0});
  }
  if(richiestaForm.Idraulico.checked){
    tmp.tipoIntervento.push({"Idraulico":0});
  }
  if(richiestaForm.Serramenti.checked){
    tmp.tipoIntervento.push({"Serramenti":0});
  }
  if(richiestaForm.Tinteggiatura.checked){
    tmp.tipoIntervento.push({"Tinteggiatura":0});
  }
  if(richiestaForm.Facchinaggio.checked){
    tmp.tipoIntervento.push({"Facchinaggio":0});
  }
  if(richiestaForm.Altro.checked){
    tmp.tipoIntervento.push({"Altro":0});
  }

  //dati rimanenti inseriti dall'utente
  tmp.descrizioneIntervento = richiestaForm.descrizioneIntervento.value

  tmp.indirizzo = richiestaForm.Indirizzo.value

  tmp.data = richiestaForm.data.value
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