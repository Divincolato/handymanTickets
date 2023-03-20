
let tickets = { push: function push(element) { [].push.call(this, element) } };
tickets = [
      {
        tipoIntervento: [{"Edile":5},{"Elettrico":3}],
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
}
);
function addNota() {
  let tmp = {
        tipoIntervento: [],
        descrizioneIntervento: "",
        indirizzo:"",
        data: "",
        lavoratore: "",
        oreImpiegate: 0,
        materialiImpiegati: [],
        completato: false,
  };
  //ciclo per inserire solo checkbox flaggate e ore
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