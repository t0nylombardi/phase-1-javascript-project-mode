import { renderCard } from './wantedCard.js';
import { loadDB } from './db/index.js';
import { WantedController } from './controllers/wantedController.js';

const Wanted = new WantedController();

const init = async () => {
  await loadDB();
  showWanted();
  addEventListeners();
};

const showWanted = async () => {
  console.log('Fetching wanted people...');
  await fetch('http://localhost:3000/wanted')
    .then((response) => response.json())
    .then((data) => data.forEach((person) => renderCard(person)))
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
};


const handleSearchEvent = (event) => {
  const searchTerm = event.target.value.trim().toLowerCase();
  const cards = document.querySelectorAll('div.card');
  cards.forEach(card => {
    card.style.display = 'revert';
    if (!card.innerText.toLowerCase().includes(searchTerm)) {
      card.style.display = 'none';
    }
  });
};

const closeModal = () => {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }
};

const addEventListeners = () => {
  document.getElementById('searchbox').addEventListener('keyup', handleSearchEvent);
  document.getElementById('close-modal').addEventListener('click', closeModal);
  document.addEventListener('click', event => {
    if (event.target.classList.contains('.modal')) closeModal();
  });
};

document.addEventListener('DOMContentLoaded', init);
