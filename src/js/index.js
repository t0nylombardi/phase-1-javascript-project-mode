// Project Requirements

  // 1. Your app must be a HTML/CSS/JS frontend that accesses data from a public API.
    // Your API should return a collection of at least 5 objects with each object having at least 3 attributes.
    // All interactions between the client and the API should be handled asynchronously and use JSON as the
    // communication format.

  // 2. Your entire app must run on a single page. There should be NO redirects or reloads.

  // 3. Use at least 3 distinct event listenersLinks to an external site.
    // If you had 3 click events, that would only count as 1 distinct event and you
    // would need to add at least 2 more. Think search or filter functionality, toggling dark/light mode, upvoting posts, etc.
    // Each of your event listeners should also have its own unique callback function.

  // 4. Your project must implement at least one instance of array iteration using available array
  // methods (map, forEach, filter, etc). Manipulating your API data in some way should present an
  // opportunity to implement your array iteration.

  // 5. Follow good coding practices. Keep your code DRY.



import {renderCard} from './components/wantedCardTemplate.js';
import { loadDB } from './db/index.js';
import { WantedController } from './controllers/wantedController.js';

const Wanted = new WantedController();
const wantedCard = document.getElementById('wantedCard');

let search_term = '';
let wantedPersons;


const init = async () => {
  await loadDB();
  // Load the wanted persons from the server
  showWanted();
}

const fetchWanted = async () => {
  const response = await fetch('http://localhost:3000/wanted');
  const data = await response.json();
  wantedPersons = data;
}


const showWanted = async () => {
  wantedCard.innerHTML = '';
  // Fetch the wanted persons from the server
  await fetchWanted();

  // Show total wanted persons from the server
  // this will filter the wanted persons that match the search term
  wantedPersons.filter(
    wanted => wanted.title.toLowerCase().includes(search_term.toLowerCase())
  ).forEach(wanted => {
    renderCard(wanted);
  });
}


const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (event) => {
  search_term = event.target.value;
  // Show the wanted persons that match the search term
  showWanted();
});




addEventListener('DOMContentLoaded', init);