let tickets = { push: function push(element) { [].push.call(this, element) } };
tickets = JSON.parse(window.localStorage.getItem("tickets"));

//prendo il nome utente salvato in localStorage da login.js
//idealmente sarebbe tutto da rifare con autenticazione google e sicuramente non in locale

let username = window.localStorage.getItem("username");
// Seleziona l'elemento DOM in cui vuoi riempire i dati
const ticketList = document.querySelector("#ticket-list");
//contatore usato per assegnare id diverso dinamicamente ad ogni riga
let index=0;

// Cicla attraverso l'array di ticket e crea una riga della tabella per ogni ticket
tickets.forEach((ticket) => {
      
    
    // Crea una nuova riga della tabella
    const tableRow = document.createElement("div");
    var ticketDetails=`
    <div class="row" style="border-style: solid; ">
  <div class="col-md-3"style="padding:15px">
  <ul class="list-group">
    <li class="list-group-item">Nome: ${ticket.nome} ${ticket.cognome}</li>
    <li class="list-group-item">Indirizzo: ${ticket.indirizzo}</li>
    <li class="list-group-item">Contatti: ${ticket.contatti}</li>
    <li class="list-group-item">Descrizione: ${ticket.descrizioneIntervento}</li>
    <input style="border-style: solid;" type="button" id="bottone${index}" value="Edit"  onclick="edit_row('${index}')"></input>
    <li class="list-group-item" id="completato${index}">Completato: ${ticket.completato ? "Si" : "No"}</li>
    <li class="list-group-item"id="lavoratore${index}">Lavoratore: ${ticket.lavoratore}</li>
    
    </ul>
</div>
		  <div class="col-md-9"style="padding:15px">
        <table class="table">
          <thead>
          <tr>
            <th>Categoria</th>
            <th>Ore</th>
            <th>Data Svolto</th>
            <th>Materiali Usati</th>
            <th>Commenti</th>
          </tr>
          </thead>
          <tbody>`;

  ticket.interventi.forEach((intervento) =>{
    ticketDetails+= `
    <tr>
    <td>${intervento.categoria}</td>
    <td>${intervento.ore}</td>
    <td>${intervento.dataSvolto}</td>
    <td>${intervento.materialiUsati}</td>
    <td>${intervento.commentiIntervento}</td>
  </tr>`
  });

  ticketDetails+=`
          
          </tbody>
        </table>  
		  </div>
		</div><br>`;

  /*
    // Aggiungi i dettagli del ticket alla riga della tabella
      ticketDetails +=`      <tr>
      <td >${ticket.nome}</td></tr><tr>
      <td >${ticket.cognome}</td></tr><tr>
      <td >${ticket.indirizzo}</td></tr><tr>
      <td >${ticket.contatti}</td></tr><tr>
      <td >${ticket.descrizioneIntervento}</td></tr><tr>
      <td id="lavoratore${index}">${ticket.lavoratore}</td></tr><tr>
      <td id="completato${index}">${ticket.completato ? "Si" : "No"}</td></tr><tr>
      <td id="bottone${index}"><input type="button" id="edit_button${index}" value="Edit" class="edit" onclick="edit_row('${index}')"></td>
      <td ><input type="button" id="save_button${index}" style="display:none" value="Save" class="save" onclick="save_row('${index}')"></td>
      </tr>
    `;*/

    tableRow.innerHTML = ticketDetails;
    // Aggiungi la riga della tabella alla lista di ticket
    ticketList.appendChild(tableRow);
    index++;
  }
  );

    function edit_row(no)
{
  //cambio il button a "save"
 //document.getElementById("bottone"+no).innerHTML='<input type="button" id="edit_button'+no+'" style="display:block" value="Save" class="save" onclick="save_row('+no+')"></input>';
 document.getElementById("bottone"+no).setAttribute( "onClick", "save_row("+no+");" );
 document.getElementById("bottone"+no).value= `Save`;

 var completato=document.getElementById("completato"+no);
 var lavoratore=document.getElementById("lavoratore"+no);
	
 if(completato.innerHTML=="Completato: Si"){
  completato.innerHTML='<select class="form-control" id="completato_text'+no+'"><option value="true" selected>Si</option><option value="false"> No</option>';
 }
 else{
  completato.innerHTML='<select class="form-control" id="completato_text'+no+'"><option value="true" >Si</option><option value="false" selected> No</option>';}
//preseleziona il lavoratore presente quando si edita in modo da lasciare lo stesso se non modificato
 if(lavoratore.innerHTML=="Lavoratore: Mario"){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Mario" selected>Mario</option><option value="Luigi">Luigi</option><option value="Giovanni">Giovanni</option>';}
  else if(lavoratore.innerHTML=="Lavoratore: Luigi"){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Mario">Mario</option><option value="Luigi" selected>Luigi</option><option value="Giovanni">Giovanni</option>';}
  else if(lavoratore.innerHTML=="Lavoratore: Giovanni"){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Mario">Mario</option><option value="Luigi">Luigi</option><option value="Giovanni" selected>Giovanni</option>';}
  else{lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Mario">Mario</option><option value="Luigi">Luigi</option><option value="Giovanni" >Giovanni</option>';
 }
}

function save_row(no)
{ var lavoratore_val="";
  if (document.getElementById("lavoratore_text"+no).value==null){
    lavoratore_val="Lavoratore: Mario";}
    else{ lavoratore_val="Lavoratore: "+document.getElementById("lavoratore_text"+no).value;}

 var completato=document.getElementById("completato"+no);


 if(document.getElementById('completato_text'+no).value=="true") {
      tickets[no].completato=true;
      completato.innerHTML="Completato: Si";
      
    }else {
      tickets[no].completato=false;
      completato.innerHTML="Completato: No";
  }

 document.getElementById("lavoratore"+no).innerHTML=lavoratore_val;
 tickets[no].lavoratore=lavoratore_val;
 
 window.localStorage.setItem("tickets", JSON.stringify(tickets));

 //faccio tornare il button a "edit" 
 document.getElementById("bottone"+no).setAttribute( "onClick", "edit_row("+no+");" );
 document.getElementById("bottone"+no).value= `Edit`;
 document.getElementById("bottone"+no).innerHTML='<input type="button" id="edit_button'+no+'" value="Edit" class="edit" onclick="edit_row('+no+')"></input>';
}