import { renderCard } from './wantedCard.js';
import { renderModal } from './wantedModal.js';
import { loadDB } from './db/db.js';
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
    .then((data) => data.forEach((person) => {
      renderCard(person)
    }))
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
  const modalContent = document.querySelector('.modal-content');

  if (modal) {
    modalContent.innerHTML = '';
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }
};

const addEventListeners = () => {
  document.getElementById('searchbox').addEventListener('keyup', handleSearchEvent);
  document.getElementById('close-modal').addEventListener('click', closeModal);
  document.addEventListener('click', event => {
    if (event.target.classList.contains('modal') || event.target.id === 'close-modal') {
      closeModal();
    }
  });
};

// Define prototype methods

/**
 * Capitalizes the first letter of a string.
 * @returns {string} The capitalized string.
 */
Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

/**
 * Removes separators from a string and converts it to title case.
 * @returns {string} The title cased string.
 */
Object.defineProperty(String.prototype, 'removeSeparator', {
  value: function() {
    return this.split('_').filter(Boolean).join(' ');
  },
  enumerable: false
});

/**
 * Converts a string to camel case.
 * @returns {string} The camel cased string.
 */
Object.defineProperty(String.prototype, 'camelCase', {
  value: function() {
    return this.removeSeparator().split(' ').map((word, index) => {
      return index === 0 ? word.toLowerCase() : word.capitalize();
    }).join('');
  },
  enumerable: false
});


document.addEventListener('DOMContentLoaded', init);
