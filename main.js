
const tickets = {
    data: [
      {
        tipoIntervento: "Edile",
        data: "2023-03-17",
        lavoratore: "Mario Rossi",
        oreImpiegate: 5,
        materialiImpiegati: ["cemento", "piastrelle"],
        completato: true,
      },
      {
        tipoIntervento: "Elettrico",
        data: "2023-03-18",
        lavoratore: "Luigi Bianchi",
        oreImpiegate: 3,
        materialiImpiegati: ["cavi", "prese"],
        completato: false,
      },
      {
        tipoIntervento: "Falegname",
        data: "2023-03-19",
        lavoratore: "Giovanni Verdi",
        oreImpiegate: 4,
        materialiImpiegati: ["legno", "chiodi"],
        completato: false,
      },
    ],
  };

  // Seleziona l'elemento DOM in cui vuoi riempire i dati
  const ticketList = document.querySelector("#ticket-list");

  // Cicla attraverso l'array di ticket e crea una riga della tabella per ogni ticket
  tickets.data.forEach((ticket) => {
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
    ticketList.appendChild(tableRow);
  });