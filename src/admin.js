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
            <th>Commenti Dipendente</th>
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
        </table> <div>
        <p class="list-group-item">Descrizione cliente: ${ticket.descrizioneIntervento}</p></div> 
		  </div>
		</div><br>`;



    tableRow.innerHTML = ticketDetails;
    // Aggiungi la riga della tabella alla lista di ticket
    ticketList.appendChild(tableRow);
    index++;
  }
  );

    function edit_row(no)
{
  //cambio il button a "save"
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
 if(tickets[no].lavoratore==="Mario"){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Da Assegnare">Da Assegnare</option><option value="Mario" selected>Mario</option><option value="Luigi">Luigi</option><option value="Giovanni">Giovanni</option>';}
  else if(tickets[no].lavoratore=="Luigi"){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Da Assegnare">Da Assegnare</option><option value="Mario">Mario</option><option value="Luigi" selected>Luigi</option><option value="Giovanni">Giovanni</option>';}
  else if(tickets[no].lavoratore=="Giovanni"){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Da Assegnare">Da Assegnare</option><option value="Mario">Mario</option><option value="Luigi">Luigi</option><option value="Giovanni" selected>Giovanni</option>';}
  else if(tickets[no].lavoratore==""){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Da Assegnare">Da Assegnare</option><option value="Mario">Mario</option><option value="Luigi">Luigi</option><option value="Giovanni" selected>Giovanni</option>';}
  else{lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Da Assegnare" selected>Da Assegnare</option><option value="Mario">Mario</option><option value="Luigi">Luigi</option><option value="Giovanni" >Giovanni</option>';
 }
}

function save_row(no)
{ //prendo valori selezionati 
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
 //salvo modificne in array
 window.localStorage.setItem("tickets", JSON.stringify(tickets));

 //faccio tornare il button a "edit" 
 document.getElementById("bottone"+no).setAttribute( "onClick", "edit_row("+no+");" );
 document.getElementById("bottone"+no).value= `Edit`;
 document.getElementById("bottone"+no).innerHTML='<input type="button" id="edit_button'+no+'" value="Edit" class="edit" onclick="edit_row('+no+')"></input>';
}