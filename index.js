
let tickets = { push: function push(element) { [].push.call(this, element) } };
tickets = [
      {
        tipoIntervento: "Edile",
        descrizioneIntervento: "",
        indirizzo:"",
        data: "2023-03-17",
        lavoratore: "Mario",
        oreImpiegate: 5,
        materialiImpiegati: ["cemento", "piastrelle"],
        completato: true
      },
      {
        tipoIntervento: "Elettrico",
        descrizioneIntervento: "",
        indirizzo:"",
        data: "2023-03-18",
        lavoratore: "Luigi",
        oreImpiegate: 3,
        materialiImpiegati: ["cavi", "prese"],
        completato: false
      },
      {
        tipoIntervento: "Falegname",
        descrizioneIntervento: "",
        indirizzo:"",
        data: "2023-03-19",
        lavoratore: "Mario",
        oreImpiegate: 4,
        materialiImpiegati: ["legno", "chiodi"],
        completato: false
      }]
  ;
  
  let addNotaButton = document.getElementById("add-nota");
  
  let richiestaForm = document.getElementById("richiesta-form");
  
addNotaButton.addEventListener("click", () => {
  addNota();
  console.log(tickets);
}
);
function addNota() {
  let tmp = {
        tipoIntervento: "",
        descrizioneIntervento: "",
        indirizzo:"",
        data: "",
        lavoratore: "",
        oreImpiegate: 0,
        materialiImpiegati: [],
        completato: false,
  };
  tmp.tipoIntervento = richiestaForm.tipoIntervento.value
  tmp.descrizioneIntervento = richiestaForm.descrizioneIntervento.value
  tmp.indirizzo = richiestaForm.Indirizzo.value
  tmp.data = richiestaForm.data.value
  tickets.push(tmp);
  window.localStorage.setItem("tickets", JSON.stringify(tickets));
}

function mySubmitFunction(e) {
    e.preventDefault();
    window.alert("Richiesta Inoltrata, verrai contattato il prima possibile.")
    return false;
  }