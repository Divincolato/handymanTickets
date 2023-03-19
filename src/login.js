 // Selezioniamo il form di login
 const loginForm = document.getElementById('login-form');
        
 // Aggiungiamo un event listener per l'evento di submit del form
 loginForm.addEventListener('submit', (event) => {
   // Evitiamo il comportamento predefinito del form, che è di aggiornare la pagina
   event.preventDefault();
   
   // Selezioniamo i campi del form per l'username e la password
   const usernameField = document.getElementById('username');
   const passwordField = document.getElementById('password');
   
   // Otteniamo il valore inserito dall'utente per l'username e la password
   const username = usernameField.value;
   const password = passwordField.value;
   
 
     if (username=="admin"||username=="Mario"||username=="Luigi"||username=="Giovanni" && password=="password") {
       // Se la risposta del server è OK, reindirizziamo l'utente alla pagina corretta
       
        window.localStorage.setItem("username", username);
        window.location.href = (username === 'admin') ? './admin.html' : './lavoratore.html';
     } else {
       // Altrimenti mostriamo un messaggio di errore all'utente
       alert('Username o password non validi');
     }
   }
 );