import  { get, update, logOut } from 'https://divincolato.github.io/src/file.js';

let tickets= get();
//fix dell'ultimo minuto per avere i tickets in ordine di data e ora, bisognerebbe implementare un metodo per permettere all'utente di ordinarli come vuole
bubbleSort(tickets);
function bubbleSort(arr){

  //Outer pass
  for(let i = 0; i < arr.length; i++){

      //Inner pass
      for(let j = 0; j < arr.length - i - 1; j++){

          //Value comparison using ascending order

          if(arr[j + 1].dataSubmit > arr[j].dataSubmit){

              //Swapping
              [arr[j + 1],arr[j]] = [arr[j],arr[j + 1]]
          }
      }
  };
  return arr;
};

//prendo username salvato in localStorage per vedere quale dipendente è connesso
//TODO da rifare, sicuramente non con js e non clientside
let email = window.localStorage.getItem("email");

//cosa poco bella per formattare il nome utente a ciò che è stato utilizzato nel resto dell'applicazione
//ci fossero stati dei dati centralizzati si poteva cambiare solo una variabile
//idealmente si dovrebbe sviluppare meglio per poter aggiungere nuovi assunti/togliere licenziati
//sicuramente non è da fare hardcoded 

let str= email.split('@', 1).join();
let username = str.charAt(0).toUpperCase() + str.slice(1);

// elemento del DOM dove finiranno i ticket
const ticketList = document.querySelector("#ticket-list");
//contatore per id dinamici elementi ticket
let index=0;
//contatore per id dinamici interventi in ogni singolo ticket
let indexInterventi=0;
  // Cicla attraverso l'array di ticket e crea una riga della tabella per ogni ticket
  tickets.forEach((ticket) => {
    if (username == ticket.lavoratore||username == "admin@handyman.com"){ 
       
      
            
          
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
              <table >
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
        //cicla ogni intervento per il singolo ticket
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
        //aumento contatore per singolo intervento
        indexInterventi++;
        });
      
  let dataSubmitTmp = new Date(ticket.dataSubmit.seconds*1000);

        ticketDetails+=`
                
                </tbody>
              </table> <div>
              <p class="list-group-item">Descrizione cliente: ${ticket.descrizioneIntervento}</p>
              <p class="list-group-item">Data richiesta: ${dataSubmitTmp.toLocaleString()}</p> </div> 
            </div>
          </div><br>`;
      
      
      
          tableRow.innerHTML = ticketDetails;
          // Aggiunge la riga della tabella alla lista di ticket
          ticketList.appendChild(tableRow);
          
        }
        //contatore ticket per id dinamici
        index++;
      });
      
//funzione edit_row, ho dovuto crearla in questo modo perchè lo scope non era più globale essendo admin.js un modulo(per poter fare import)
window.edit_row = function(indexInterventi, indexTicket)
      {
        //cambio il button da "edit" a "save"
       document.getElementById("bottone"+indexInterventi).setAttribute( "onClick", "save_row("+indexInterventi+", "+indexTicket+");" );
       document.getElementById("bottone"+indexInterventi).value= `Save`;
        
  //prendo gli elementi che si vogliono cambiare
        var ore=document.getElementById("ore"+indexInterventi);
        var dataSvolto=document.getElementById("dataSvolto"+indexInterventi);
        var materialiUsati=document.getElementById("materialiUsati"+indexInterventi);
        var commentiIntervento=document.getElementById("commentiIntervento"+indexInterventi);

	//prepopolo i menù a tendina con l'opzione che era presente 
  //così se non modificata l'opzione rimane con lo stesso valore
  //da rifare ciclando e modificando le properties, non usando una String per ogni cosa

        ore.innerHTML='<input type="number" id="oreData'+indexInterventi+'" size="1" value="'+ore.innerHTML+'"></input>';
        dataSvolto.innerHTML='<input type="date" id="dataSvoltoData'+indexInterventi+'" size="3" value="'+dataSvolto.innerHTML+'"></input>';
        materialiUsati.innerHTML='<textarea type="text" id="materialiUsatiData'+indexInterventi+'" rows="1" cols="15" value="" style="height:42px">'+materialiUsati.innerHTML+'</textarea>';
        commentiIntervento.innerHTML='<textarea type="text" id="commentiInterventoData'+indexInterventi+'" rows="1" cols="15" value="" style="height:42px">'+commentiIntervento.innerHTML+'</textarea>';
        
        
      }
      
//stessa cosa che per edit_row, la funzione non era più nello scope globale
window.save_row = function(indexInterventi, indexTicket)
      { //prendo valori selezionati 
       var ore=document.getElementById("ore"+indexInterventi);
       var dataSvolto=document.getElementById("dataSvolto"+indexInterventi);
       var materialiUsati=document.getElementById("materialiUsati"+indexInterventi);
       var commentiIntervento=document.getElementById("commentiIntervento"+indexInterventi);
       
        //prendo i dati da loro contenuti
       var oreData = document.getElementById("oreData"+indexInterventi);
       var dataSvoltoData = document.getElementById("dataSvoltoData"+indexInterventi);
       var materialiUsatiData = document.getElementById("materialiUsatiData"+indexInterventi);
       var commentiInterventoData = document.getElementById("commentiInterventoData"+indexInterventi);
       
       //li inserisco in tickets e li rimetto nel dom
      tickets[indexTicket].interventi[indexInterventi].ore= oreData.value;
      ore.innerHTML = oreData.value;
       
      tickets[indexTicket].interventi[indexInterventi].dataSvolto= dataSvoltoData.value;
      dataSvolto.innerHTML = dataSvoltoData.value;

      tickets[indexTicket].interventi[indexInterventi].materialiUsati= materialiUsatiData.value;
      materialiUsati.innerHTML = materialiUsatiData.value;

      tickets[indexTicket].interventi[indexInterventi].commentiIntervento= commentiInterventoData.value;
      commentiIntervento.innerHTML = commentiInterventoData.value;


      //rimando il ticket a firebase
      update(tickets[indexTicket]);

       //faccio tornare il button a "edit" 
       document.getElementById("bottone"+indexInterventi).setAttribute( "onClick", "edit_row("+indexInterventi+","+indexTicket+");" );
       document.getElementById("bottone"+indexInterventi).value= `Edit`;
      }
      
      window.logOut = function(){ 
        console.log("a");
        logOut();}
      