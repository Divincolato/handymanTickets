let tickets = { push: function push(element) { [].push.call(this, element) } };
tickets = JSON.parse(window.localStorage.getItem("tickets"));

let username = window.localStorage.getItem("username");
  // Seleziona l'elemento DOM in cui vuoi riempire i dati
  const ticketList = document.querySelector("#ticket-list");
let index=0;
  // Cicla attraverso l'array di ticket e crea una riga della tabella per ogni ticket
  tickets.forEach((ticket) => {
    if (username == ticket.lavoratore||username == "admin"){
       
    
    // Crea una nuova riga della tabella
    const tableRow = document.createElement("tr");
    var ticketDetails="";
    var tipoInterv = [];
    var oreImpiegate = [];

    ticket.tipoIntervento.forEach((item) => {
      let entries = Object.entries(item);
      tipoInterv.push(entries[0][0]);
      oreImpiegate.push(entries[0][1]);
    });
    // Aggiungi i dettagli del ticket alla riga della tabella
    ticketDetails+=`<td id="riga${index}">${ticket.cliente}</td><td id="riga${index}">${ticket.indirizzo}</td>`
    ticketDetails += `<td id="riga${index}">${tipoInterv.join(", ")}</td>
      <td id="oreImpiegate${index}"">${oreImpiegate.join(", ")}</td>
      <td>${ticket.data}</td>
      <td id="lavoratore${index}">${ticket.lavoratore}</td>
      <td id="materialiImpiegati${index}">${ticket.materialiImpiegati.join(", ")}</td>
      <td id="completato${index}">${ticket.completato ? "Si" : "No"}</td>
      <input type="button" id="edit_button${index}" value="Edit" class="edit" onclick="edit_row('${index}')">
      <input type="button" id="save_button${index}" style="display:none" value="Save" class="save" onclick="save_row('${index}')">
      
    `;
    tableRow.innerHTML = ticketDetails;

    // Aggiungi la riga della tabella alla lista di ticket
    ticketList.appendChild(tableRow);
    
  }index++;
  });


    function edit_row(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";
	
 var completato=document.getElementById("materialiImpiegati"+no);
 var lavoratore=document.getElementById("oreImpiegate"+no);
	
 var completato_data=completato.innerHTML;
 var lavoratore_data=lavoratore.innerHTML;
	
 completato.innerHTML="<input  type='text' id='completato_text"+no+"' rows='3' value='"+completato_data+"'>";
 lavoratore.innerHTML="<input type='text' id='lavoratore_text"+no+"' rows='3' value='"+lavoratore_data+"'>";
}

function save_row(no)
{
 var completato_val=document.getElementById("completato_text"+no).value;
 var lavoratore_val=document.getElementById("lavoratore_text"+no).value;

 document.getElementById("materialiImpiegati"+no).innerHTML=completato_val;
 tickets[no].materialiImpiegati=completato_val.split(", ");
 document.getElementById("oreImpiegate"+no).innerHTML=lavoratore_val;
 tickets[no].oreImpiegate=lavoratore_val;
 
 window.localStorage.setItem("tickets", JSON.stringify(tickets));

 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";
 console.log(tickets);
}