// As a user, I want the application to load properly
// when I open it so that I can use it smoothly.
// Feature: Initialize Application

// As a user, I want to see a list of wanted people displayed
// when I open the application so that I can know who is wanted.
// Feature: Show Wanted People

// As a user, I want to search for specific people in the
// wanted list so that I can find them quickly.
// Feature: Handle Search Event

// As a user, I want the application to respond to my interactions,
// like typing in the search box or clicking on buttons, so that I can use it easily.
// Feature: Add Event Listeners

// As a user, I want to be able to customize strings easily,
// like making the first letter uppercase or removing certain characters,
// so that I can format text the way I want.
// Feature: Prototype Methods


import { renderCard } from './wantedCard.js';
import { loadDB } from './db/db.js';

/**
 * Initializes the application.
 * @function init
 * @returns {void}
 */
const init = async () => {
  await loadDB();
  showWanted();
  addEventListeners();
};

/**
 * Fetches wanted people from the server and renders them.
 * @function showWanted
 * @returns {void}
 */
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

/**
 * Adds event listeners to the search box and modal.
 * @function addEventListeners
 * @returns {void}
 * @listens searchbox:keyup
 * @listens document:click
 */
const addEventListeners = () => {
  document.getElementById('searchbox').addEventListener('keyup', handleSearchEvent);
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
