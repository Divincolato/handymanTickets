
import  { get, update, logOut } from './file.js';
//chiamata a get() in file.js, metodo che carica i tickets da firebase
//idealmente bisognerebbe implementare meglio la funzione facendola asincrona
let tickets= get();

// Elemento dove verranno messi i ticket creati nel DOM
const ticketList = document.querySelector("#ticket-list");

//contatore usato per assegnare id diverso dinamicamente ad ogni riga
let index=0;

// Cicla attraverso l'array di ticket e crea una riga della tabella per ogni ticket
tickets.forEach((ticket) => {
      
    
    // Crea una nuova riga della tabella
    const tableRow = document.createElement("div");
    //var ticketDetails conterrà l'innerHtml di una "card" ticket
    var ticketDetails=`
    <div class="row" style="border-style: solid; ">
      <div class="col-md-3"style="padding:15px">
        <ul class="list-group">
          <li class="list-group-item">Nome: ${ticket.nome} ${ticket.cognome}</li>
          <li class="list-group-item">Indirizzo: ${ticket.indirizzo}</li>
          <li class="list-group-item">Contatti: ${ticket.contatti}</li>
          <input style="border-style: solid;" type="button" id="bottone${index}" value="Edit"  onclick="edit_row('${index}')"></input>
          <li class="list-group-item" id="completato${index}">Completato: ${ticket.completato ? "Si" : "No"}</li>
          <li class="list-group-item"id="lavoratore${index}">Lavoratore: ${ticket.lavoratore}</li>
          <li class="list-group-item"id="costoTotale${index}">Costo Totale: ${getTicketCost(ticket)} $ </li>
    
        </ul>
    </div>
		  <div class="col-md-9"style="padding:15px">
        <table class="table">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Ore</th>
              <th>Costo</th>
              <th>Data Svolto</th>
              <th>Materiali Usati</th>
              <th>Commenti Dipendente</th>
            </tr>
          </thead>
          <tbody>`;
  //ciclo innestato che processa ogni intervento appartenente al singolo ticket
  ticket.interventi.forEach((intervento) =>{
    
    ticketDetails+= `
    <tr>
    <td>${intervento.categoria}</td>
    <td>${intervento.ore}</td>
    <td>${getInterventionPrice(intervento)}$</td>
    <td>${intervento.dataSvolto}</td>
    <td>${intervento.materialiUsati}</td>
    <td>${intervento.commentiIntervento}</td>
    
  </tr>`
  });

  ticketDetails+=`
          
          </tbody>
        </table> <div>
        <p class="list-group-item">Descrizione cliente: ${ticket.descrizioneIntervento}</p></div> 
		  </div>
		</div><br>`;



    tableRow.innerHTML = ticketDetails;
    // Aggiungi la riga della tabella alla lista di ticket sul DOM
    ticketList.appendChild(tableRow);
    //aumento contatore per id dinamici
    index++;
  }
  );

  //funzione edit_row, ho dovuto crearla in questo modo perchè lo scope non era più globale essendo admin.js un modulo(per poter fare import)
    window.edit_row = function(no)
{
  //cambio il button da "edit" a "save"
 document.getElementById("bottone"+no).setAttribute( "onClick", "save_row("+no+");" );
 document.getElementById("bottone"+no).value= `Save`;
  //prendo gli elementi che si vogliono cambiare
 var completato=document.getElementById("completato"+no);
 var lavoratore=document.getElementById("lavoratore"+no);
	//prepopolo i menù a tendina con l'opzione che era presente 
  //così se non modificata l'opzione rimane con lo stesso valore
  //da rifare ciclando e modificando le properties, non usando una String per ogni cosa
 if(completato.innerHTML=="Completato: Si"){
  completato.innerHTML='<select class="form-control" id="completato_text'+no+'"><option value="true" selected>Si</option><option value="false"> No</option>';
 }
 else{
  completato.innerHTML='<select class="form-control" id="completato_text'+no+'"><option value="true" >Si</option><option value="false" selected> No</option>';}

  //preseleziona il lavoratore presente quando si edita in modo da lasciare lo stesso se non modificato
 if(tickets[no].lavoratore==="Mario"){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Da Assegnare">Da Assegnare</option><option value="Mario" selected>Mario</option><option value="Luigi">Luigi</option><option value="Giovanni">Giovanni</option>';}
  else if(tickets[no].lavoratore=="Luigi"){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Da Assegnare">Da Assegnare</option><option value="Mario">Mario</option><option value="Luigi" selected>Luigi</option><option value="Giovanni">Giovanni</option>';}
  else if(tickets[no].lavoratore=="Giovanni"){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Da Assegnare">Da Assegnare</option><option value="Mario">Mario</option><option value="Luigi">Luigi</option><option value="Giovanni" selected>Giovanni</option>';}
  else if(tickets[no].lavoratore==""){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Da Assegnare">Da Assegnare</option><option value="Mario">Mario</option><option value="Luigi">Luigi</option><option value="Giovanni" selected>Giovanni</option>';}
  else{lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Da Assegnare" selected>Da Assegnare</option><option value="Mario">Mario</option><option value="Luigi">Luigi</option><option value="Giovanni" >Giovanni</option>';
 }
}
//stessa cosa che per edit_row, la funzione non era più nello scope globale
window.save_row = function(no)
{ 
  //prendo valori selezionati 
  var lavoratore_val="";
  if (document.getElementById("lavoratore_text"+no).value==null){
    lavoratore_val="Da Assegnare";}
    else{ lavoratore_val=document.getElementById("lavoratore_text"+no).value;}

 var completato=document.getElementById("completato"+no);

//li ritorno all'array e al dom
 if(document.getElementById('completato_text'+no).value=="true") {
      tickets[no].completato=true;
      completato.innerHTML="Completato: Si";
      
    }else {
      tickets[no].completato=false;
      completato.innerHTML="Completato: No";
  }

 document.getElementById("lavoratore"+no).innerHTML="Lavoratore: "+lavoratore_val;
 tickets[no].lavoratore=lavoratore_val;
 //mando array modificato a firebase

 update(tickets[no]);

 //faccio tornare il button a "edit" 
 document.getElementById("bottone"+no).setAttribute( "onClick", "edit_row("+no+");" );
 document.getElementById("bottone"+no).value= `Edit`;
 document.getElementById("bottone"+no).innerHTML='<input type="button" id="edit_button'+no+'" value="Edit" class="edit" onclick="edit_row('+no+')"></input>';
}

//prendo il prezzo di ogni intervento in un ticket con map chiamando getInterventionPrice() e riduco l'array ritornato per avere il costo totale
function getTicketCost(ticket) {
  
  return ticket.interventi.map((intervento) => getInterventionPrice(intervento)).reduce((acc, cur) => acc + cur, 0);
}

//calcolo costo intervento singolo, utilizzato anche da getTicketCost
//bisognerebbe dare la possiblità di inserire mezz'ore al momento viene usata mezzora come unità di calcolo 
//ma non è possibile inserire qualcosa di diverso da ore intere
function getInterventionPrice(intervento)  {
  const handymanServiceCall = 250; // prime due ore+service call
  const additionalTime = 55; // ogni mezzora
  const interiorPainting = 45; // ora pittura/2 
  let cost=0;
  
    let rate;
    if(intervento.categoria=="Pittura"){rate=interiorPainting;}
    else if(intervento.ore==0){return 0;}
    else if(intervento.ore<=2){return 250;}
    else{rate = additionalTime;}
    
    cost = handymanServiceCall + rate * (intervento.ore*2 - 4);
    
    return cost;
}


window.logOut = function(){ 
  console.log("a");
  logOut();}
