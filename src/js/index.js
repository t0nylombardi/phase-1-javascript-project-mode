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

import { renderCard } from './components/wantedCardTemplate.js';
import { loadDB } from './db/index.js';
import { WantedController } from './controllers/wantedController.js';

const Wanted = new WantedController();

let wantedPersons;

const init = async () => {
  await loadDB();

  // Load the wanted persons from the db
  showWanted();

  const searchInput = document.getElementById('searchbox');
  searchInput.addEventListener('keyup', handelSearchEvent);

  document.getElementById('close-modal').addEventListener('click', closeModal);
  // close modals on background click
  document.addEventListener('click', event => {
    if (event.target.classList.contains('update-modal')) {
      closeModal();
    }
  });
}

const fetchWanted = async () => {
  const response = await fetch('http://localhost:3000/wanted');
  const data = await response.json();
  wantedPersons = data;
}

const showWanted = async () => {
  // Fetch the wanted persons from the server
  await fetchWanted();

  wantedPersons.forEach(person => {
    renderCard(person);
  });
}

const handelSearchEvent = (event) => {
  const cards = document.querySelectorAll('div.card');
  const searchTerm = event.target.value.trim().toLowerCase();
  cards.forEach(card => {
    card.style.display = 'revert';

    if (!card.innerText.toLowerCase().includes(searchTerm)) {
      card.style.display = 'none';
    }
  });
};

// close currently open modal
const closeModal = () => {
  document.querySelector('.update-modal').classList.remove('open');
  document.body.classList.remove('modal-open');
}

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", init);
} else {
  // `DOMContentLoaded` has already fired
  init();
}