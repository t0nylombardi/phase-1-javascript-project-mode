import { renderCard } from './wantedCard.js';
import { loadDB } from './db/index.js';
import { WantedController } from './controllers/wantedController.js';

const Wanted = new WantedController();

let wantedPersons;

const init = async () => {
  await loadDB();
  showWanted();
  addEventListeners();
};

const fetchWanted = async () => {
  const response = await fetch('http://localhost:3000/wanted');
  return await response.json();
};

const showWanted = async () => {
  wantedPersons = await fetchWanted();
  wantedPersons.forEach(renderCard);
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
  const modal = document.querySelector('.update-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }
};

const addEventListeners = () => {
  document.getElementById('searchbox').addEventListener('keyup', handleSearchEvent);
  document.getElementById('close-modal').addEventListener('click', closeModal);
  document.addEventListener('click', event => {
    if (event.target.classList.contains('update-modal')) closeModal();
  });
};

document.addEventListener('DOMContentLoaded', init);
