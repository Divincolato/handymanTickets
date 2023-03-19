let tickets = { push: function push(element) { [].push.call(this, element) } };
tickets = JSON.parse(window.localStorage.getItem("tickets"));

let username = window.localStorage.getItem("username");
console.log(username);
  // Seleziona l'elemento DOM in cui vuoi riempire i dati
  const ticketList = document.querySelector("#ticket-list");

  // Cicla attraverso l'array di ticket e crea una riga della tabella per ogni ticket
  tickets.forEach((ticket) => {
    console.log(ticket.lavoratore);
    if (username == ticket.lavoratore||username == "admin"){
    // Crea una nuova riga della tabella
    const tableRow = document.createElement("tr");

    // Aggiungi i dettagli del ticket alla riga della tabella
    const ticketDetails = `
      <td>${ticket.tipoIntervento}</td>
      <td>${ticket.data}</td>
      <td>${ticket.lavoratore}</td>
      <td>${ticket.oreImpiegate}</td>
      <td>${ticket.materialiImpiegati.join(", ")}</td>
      <td>${ticket.completato ? "Si" : "No"}</td>
    `;
    tableRow.innerHTML = ticketDetails;

    // Aggiungi la riga della tabella alla lista di ticket
    ticketList.appendChild(tableRow);}
  });