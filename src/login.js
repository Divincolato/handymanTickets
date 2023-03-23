 
import  { logIn } from 'https://divincolato.github.io/src/file.js';
// Selezioniamo il form di login
const loginForm = document.getElementById('login-form');
// Aggiungiamo un event listener per l'evento di submit del form
loginForm.addEventListener('submit', (event) => {
 event.preventDefault();
 if(logIn(loginForm.email.value, loginForm.password.value)){
   window.location.replace("http://www.w3schools.com");}
 
  
}
 
);

