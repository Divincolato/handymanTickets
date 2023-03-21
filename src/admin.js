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
    <div class="row">
    <div class="col-md-2">
    <ul class="list-group">
      <li class="list-group-item">Nome</li>
      <li class="list-group-item">Cognome</li>
      <li class="list-group-item">Indirizzo</li>
      <li class="list-group-item">Contatti</li>
      <li class="list-group-item">Descrizione</li>
    </ul>
  </div>
  <div class="col-md-4">
  <ul class="list-group">
    <li class="list-group-item">${ticket.nome}</li>
    <li class="list-group-item">${ticket.cognome}</li>
    <li class="list-group-item">${ticket.indirizzo}</li>
    <li class="list-group-item">${ticket.contatti}</li>
    <li class="list-group-item">${ticket.descrizioneIntervento}</li>
  </ul>
</div>
		  <div class="col-md-6">
        <table class="table">
          <thead>
          <tr>
            <th>Colonna 1</th>
            <th>Colonna 2</th>
            <th>Colonna 3</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Riga 1, colonna 1</td>
            <td>Riga 1, colonna 2</td>
            <td>Riga 1, colonna 3</td>
          </tr>
          <tr>
            <td>Riga 2, colonna 1</td>
            <td>Riga 2, colonna 2</td>
            <td>Riga 2, colonna 3</td>
          </tr>
          </tbody>
        </table>
		  </div>
		</div>`;

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
    console.log(tableRow.innerHTML)
    // Aggiungi la riga della tabella alla lista di ticket
    ticketList.appendChild(tableRow);
    index++;
  }
  );

    function edit_row(no)
{
  //cambio il button a "save"
 document.getElementById("bottone"+no).innerHTML='<input type="button" id="edit_button'+no+'" style="display:block" value="Save" class="save" onclick="save_row('+no+')"></input>';

 var completato=document.getElementById("completato"+no);
 var lavoratore=document.getElementById("lavoratore"+no);
	
 if(completato.innerHTML=="Si"){
  completato.innerHTML='<select class="form-control" id="completato_text'+no+'"><option value="true" selected>Si</option><option value="false"> No</option>';
 }
 else{
  completato.innerHTML='<select class="form-control" id="completato_text'+no+'"><option value="true" >Si</option><option value="false" selected> No</option>';}
//preseleziona il lavoratore presente quando si edita in modo da lasciare lo stesso se non modificato
 if(lavoratore.innerHTML=="Mario"){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Mario" selected>Mario</option><option value="Luigi">Luigi</option><option value="Giovanni">Giovanni</option>';}
  else if(lavoratore.innerHTML=="Luigi"){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Mario">Mario</option><option value="Luigi" selected>Luigi</option><option value="Giovanni">Giovanni</option>';}
  else if(lavoratore.innerHTML=="Giovanni"){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Mario">Mario</option><option value="Luigi">Luigi</option><option value="Giovanni" selected>Giovanni</option>';}
  else{lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Mario">Mario</option><option value="Luigi">Luigi</option><option value="Giovanni" >Giovanni</option>';
 }
}

function save_row(no)
{ var lavoratore_val="";
  if (document.getElementById("lavoratore_text"+no).value==null){
    lavoratore_val="Mario";}
    else{ lavoratore_val=document.getElementById("lavoratore_text"+no).value;}

 var completato=document.getElementById("completato"+no);


 if(document.getElementById('completato_text'+no).value=="true") {
      tickets[no].completato=true;
      completato.innerHTML="Si";
      
    }else {
      tickets[no].completato=false;
      completato.innerHTML="No";
  }

 document.getElementById("lavoratore"+no).innerHTML=lavoratore_val;
 tickets[no].lavoratore=lavoratore_val;
 
 window.localStorage.setItem("tickets", JSON.stringify(tickets));

 //faccio tornare il button a "edit"
 document.getElementById("bottone"+no).innerHTML='<input type="button" id="edit_button'+no+'" value="Edit" class="edit" onclick="edit_row('+no+')"></input>';
}