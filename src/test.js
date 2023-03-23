 
import  { add, get, signIn, update } from './file.js';



 // Selezioniamo il form di login
 const loginForm = document.getElementById('login-form');

 // Aggiungiamo un event listener per l'evento di submit del form
 loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  signIn(loginForm.email.value, loginForm.password.value)}
 );