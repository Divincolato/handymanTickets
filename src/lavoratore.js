let tickets = { push: function push(element) { [].push.call(this, element) } };
tickets = JSON.parse(window.localStorage.getItem("tickets"));

let username = window.localStorage.getItem("username");
  // Seleziona l'elemento DOM in cui vuoi riempire i dati
  const ticketList = document.querySelector("#ticket-list");
let index=0;
let indexInterventi=0;
  // Cicla attraverso l'array di ticket e crea una riga della tabella per ogni ticket
  tickets.forEach((ticket) => {
    if (username == ticket.lavoratore||username == "admin"){
       
      
            
          
          // Crea una nuova riga della tabella
          const tableRow = document.createElement("div");
          var ticketDetails=`
          <div class="row" style="border-style: solid; ">
        <div class="col-md-3"style="padding:15px; border-right:solid; ">
        <ul class="list-group">
          
          <li class="list-group-item">Nome: ${ticket.nome} ${ticket.cognome}</li>
          <li class="list-group-item">Indirizzo: ${ticket.indirizzo}</li>
          <li class="list-group-item">Contatti: ${ticket.contatti}</li>
          <li class="list-group-item" id="completato${index}">Completato: ${ticket.completato ? "Si" : "No"}</li>
          <li class="list-group-item"id="lavoratore${index}">Lavoratore: ${ticket.lavoratore}</li>
          
          </ul>
      </div>
            <div class="col-md-9"style="padding:15px">
              <table class="table">
                <thead>
                <tr>
                  <th>Categoria</th><th></th>
                  <th>Ore</th>
                  <th>Data Intervento</th>
                  <th>Materiali Usati</th>
                  <th>Commenti Dipendente</th>
                </tr>
                </thead>
                <tbody>`;
        indexInterventi=0;

        ticket.interventi.forEach((intervento) =>{
          ticketDetails+= `
          <tr>
          <td >${intervento.categoria}</td>
          <td><input style="border-style: solid;" type="button" id="bottone${indexInterventi}" value="Edit"  onclick="edit_row(${indexInterventi}, ${index})"></input></td>
          <td id="ore${indexInterventi}">${intervento.ore}</td>
          <td id="dataSvolto${indexInterventi}">${intervento.dataSvolto}</td>
          <td id="materialiUsati${indexInterventi}">${intervento.materialiUsati}</td>
          <td id="commentiIntervento${indexInterventi}">${intervento.commentiIntervento}</td>
        </tr>`
        indexInterventi++;
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
          
        }index++;
      });
      
          function edit_row(no, no2)
      {
        //cambio il button a "save"
       document.getElementById("bottone"+no).setAttribute( "onClick", "save_row("+no+", "+no2+");" );
       document.getElementById("bottone"+no).value= `Save`;
        
       //var completato=document.getElementById("completato"+no);
       //var lavoratore=document.getElementById("lavoratore"+no);

        var ore=document.getElementById("ore"+no);
        var dataSvolto=document.getElementById("dataSvolto"+no);
        var materialiUsati=document.getElementById("materialiUsati"+no);
        var commentiIntervento=document.getElementById("commentiIntervento"+no);

        ore.innerHTML='<input type="number" id="oreData'+no+'" size="1" value="'+ore.innerHTML+'"></input>';
        dataSvolto.innerHTML='<input type="date" id="dataSvoltoData'+no+'" size="3" value="'+dataSvolto.innerHTML+'"></input>';
        materialiUsati.innerHTML='<textarea type="text" id="materialiUsatiData'+no+'" rows="1" cols="8" value="">'+materialiUsati.innerHTML+'</textarea>';
        commentiIntervento.innerHTML='<textarea type="text" id="commentiInterventoData'+no+'" rows="1" cols="8" value="" >'+commentiIntervento.innerHTML+'</textarea>';
        
        
      }
      
      function save_row(indexInterventi, indexTicket)
      { //prendo valori selezionati 
       var ore=document.getElementById("ore"+indexInterventi);
       var dataSvolto=document.getElementById("dataSvolto"+indexInterventi);
       var materialiUsati=document.getElementById("materialiUsati"+indexInterventi);
       var commentiIntervento=document.getElementById("commentiIntervento"+indexInterventi);
       

       var oreData = document.getElementById("oreData"+indexInterventi);
       var dataSvoltoData = document.getElementById("dataSvoltoData"+indexInterventi);
       var materialiUsatiData = document.getElementById("materialiUsatiData"+indexInterventi);
       var commentiInterventoData = document.getElementById("commentiInterventoData"+indexInterventi);
       
      tickets[indexTicket].interventi[indexInterventi].ore= oreData.value;
      ore.innerHTML = oreData.value;
       
      tickets[indexTicket].interventi[indexInterventi].dataSvolto= dataSvoltoData.value;
      dataSvolto.innerHTML = dataSvoltoData.value;

      tickets[indexTicket].interventi[indexInterventi].materialiUsati= materialiUsatiData.value;
      materialiUsati.innerHTML = materialiUsatiData.value;

      tickets[indexTicket].interventi[indexInterventi].commentiIntervento= commentiInterventoData.value;
      commentiIntervento.innerHTML = commentiInterventoData.value;


       //salvo modificne in array
       window.localStorage.setItem("tickets", JSON.stringify(tickets));
      
       //faccio tornare il button a "edit" 
       document.getElementById("bottone"+indexInterventi).setAttribute( "onClick", "edit_row("+indexInterventi+","+indexTicket+");" );
       document.getElementById("bottone"+indexInterventi).value= `Edit`;
      }