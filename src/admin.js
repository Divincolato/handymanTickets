let tickets = { push: function push(element) { [].push.call(this, element) } };
tickets = JSON.parse(window.localStorage.getItem("tickets"));

let username = window.localStorage.getItem("username");
  // Seleziona l'elemento DOM in cui vuoi riempire i dati
  const ticketList = document.querySelector("#ticket-list");
let index=0;
  // Cicla attraverso l'array di ticket e crea una riga della tabella per ogni ticket
  tickets.forEach((ticket) => {
      
    
    // Crea una nuova riga della tabella
    const tableRow = document.createElement("tr");

    // Aggiungi i dettagli del ticket alla riga della tabella
    const ticketDetails = `
      <td id="riga${index}">${ticket.tipoIntervento}</td>
      <td>${ticket.data}</td>
      <td id="lavoratore${index}">${ticket.lavoratore}</td>
      <td>${ticket.oreImpiegate}</td>
      <td>${ticket.materialiImpiegati.join(", ")}</td>
      <td id="completato${index}">${ticket.completato ? "Si" : "No"}</td>
      <input type="button" id="edit_button${index}" value="Edit" class="edit" onclick="edit_row('${index}')">
      <input type="button" id="save_button${index}" style="display:none" value="Save" class="save" onclick="save_row('${index}')">
      
    `;
    tableRow.innerHTML = ticketDetails;

    // Aggiungi la riga della tabella alla lista di ticket
    ticketList.appendChild(tableRow);
    index++;
  }
  );

console.log(tickets);
    function edit_row(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";
	
 var completato=document.getElementById("completato"+no);
 var lavoratore=document.getElementById("lavoratore"+no);
	
 var completato_data=completato.innerHTML;
 var lavoratore_data=lavoratore.innerHTML;
	
 completato.innerHTML='<input type="radio" id="completato_text_si'+no+'"  value="Si">  <label for="Si">Si</label>  <input type="radio" id="completato_text_no'+no+'"  value="No">  <label for="No">No</label>'
 
 if(lavoratore.innerHTML=="Mario")
 {lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Mario" selected>Mario</option><option value="Luigi">Luigi</option><option value="Giovanni">Giovanni</option>';
}else 
if(lavoratore.innerHTML=="Luigi")
{lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Mario">Mario</option><option value="Luigi" selected>Luigi</option><option value="Giovanni">Giovanni</option>';
}else 
if(lavoratore.innerHTML=="Giovanni"){lavoratore.innerHTML='<select class="form-control" id="lavoratore_text'+no+'"><option value="Mario">Mario</option><option value="Luigi">Luigi</option><option value="Giovanni" selected>Giovanni</option>';
}
}

function save_row(no)
{
 var lavoratore_val=document.getElementById("lavoratore_text"+no).value;

 var completato=document.getElementById("completato"+no);
 if(document.getElementById('completato_text_si'+no).checked) {
      tickets[no].completato=true;
      completato.innerHTML="Si";
      
    }else if(document.getElementById('completato_text_no'+no).checked) {
      tickets[no].completato=false;
      completato.innerHTML="No";
  }

 document.getElementById("lavoratore"+no).innerHTML=lavoratore_val;
 tickets[no].lavoratore=lavoratore_val;
 
 window.localStorage.setItem("tickets", JSON.stringify(tickets));

 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";
}