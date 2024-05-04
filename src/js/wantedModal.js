// As a user, I want to view and edit the details of a wanted person in a modal.
// After submitting the edited details, I expect the modal to close automatically,
// a new card to be rendered with the updated information, and the page to scroll
// to the newly rendered card for easy access. Additionally, I prefer the form fields
// in the modal to be pre-filled with the existing details of the person and to only
// display relevant information. The modal should close if I click outside of it or
// on the close button, and it should clearly indicate the type of details I'm editing
// to ensure accuracy in my changes.

import { WantedController } from './controllers/wantedController.js';
import { isNull } from './utils.js';
import { renderCard } from './wantedCard.js';

const Wanted = new WantedController();

/**
 * Renders a modal to edit details of a wanted person.
 * @param {Object} person - The wanted person object.
 */
export const renderModal = (person) => {
  const modal = document.querySelector('.modal');
  modal.classList.add('open');
  document.body.classList.add('modal-open');

  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML += createModalContent(person);
  document.getElementById('close-modal').addEventListener('click', closeModal);

  document.addEventListener('click', event => {
    if (event.target.classList.contains('modal') || event.target.id === 'close-modal') {
      closeModal();
    }
  });

  const form = document.querySelector('.person-details-form');
  form.addEventListener('submit', handleFormSubmit(person));
};

/**
 * Handles the form submission event.
 * @param {Event} event - The form submission event.
 * @returns {Object} The updated wanted person object.
 */
function handleFormSubmit (person) {
  return (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedPerson = { ...person, ...getDataFromForm(form) };

    Wanted.updateWantedPerson(person.id, updatedPerson)

    closeModal();
    renderNewCard(updatedPerson);
  }
}

/**
 * Renders a new card with updated details.
 * @param {Object} person - The updated person object.
 * @returns {void}
 */
const renderNewCard = (person) => {
  // Remove the old card
  const wantedCard = document.getElementById(person.id);
  wantedCard.remove();
  // Render the new card
  renderCard(person);
  // Scroll to the new card
  document.getElementById(person.id).scrollIntoView({ behavior: 'smooth' });
};

/**
 * Gets the person object from the form.
 * @param {HTMLFormElement} form - The form element.
 * @returns {Object} The person object.
 */
const getDataFromForm = (form) => {
  const formData = new FormData(form);
  const person = Object.fromEntries(formData);
  console.log('person', person);
  return person;
}

/**
 * Closes the modal by removing its content and hiding it.
 * @function closeModal
 * @returns {void}
 */
const closeModal = () => {
  // Select the modal and its content
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content');

  // Check if modal exists
  if (modal) {
    modalContent.remove();
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }
}

/**
 * Creates the content for the modal.
 * @param {Object} person - The wanted person object.
 * @returns {string} The HTML content for the modal.
 */
const createModalContent = (person) => {
  const detailsToRender = [
    'age_range',
    'eyes',
    'hair',
    'height_max',
    'place_of_birth',
    'race',
    'sex',
    'weight_max',
  ];

  return `
    <div class="modal-content">
      <h2 class="title">
        // Enter new details for <span>${getPersonTitle(person)}</span>
      </h2>
      ${createForm(person, detailsToRender)}
    </div>
  `;
};

/**
 * Gets the title of the person.
 * @param {Object} person - The wanted person object.
 * @returns {string} The title of the person.
 */
const getPersonTitle = (person) => {
  return person.title.split('-')[0];
};

/**
 * Creates the form for editing person details.
 * @param {Object} person - The wanted person object.
 * @param {Array} detailsToRender - The details to render in the form.
 * @returns {string} The HTML content for the form.
 */
const createForm = (person, detailsToRender) => {
  const details = filterDetails(person, detailsToRender);

  return `
    <form class="person-details-form">
      ${renderFormElements(details)}
      <button class="btn" type="submit">Submit</button>
    </form>
  `;
};

/**
 * Filters the details object based on provided keys.
 * @param {Object} person - The wanted person object.
 * @param {Array} detailsToRender - The details keys to render.
 * @returns {Object} The filtered details object.
 */
const filterDetails = (person, detailsToRender) => {
  return Object.keys(person)
    .filter(key => detailsToRender.includes(key))
    .reduce((filteredDetails, key) => {
      return { ...filteredDetails, [key]: person[key] };
    }, {});
};

/**
 * Renders form elements based on details object.
 * @param {Object} details - The details object.
 * @returns {string} The HTML content for form elements.
 */
const renderFormElements = (details) => {
  return Object.keys(details).map(key => `
    <div class="variables form-group">
      <span class="variable-type">let</span>
      <span class="variable-name">${toCamelCase(key)}</span>
      <span class="variable-assignment">=</span>
      <input
        type="text"
        class="variable-value"
        id="${key}"
        name="${key}"
        value="${isNull(details[key])}">
    </div>
  `).join('');
};

/**
 * Converts a string to camel case.
 * @param {string} str - The string to convert.
 * @returns {string} The string in camel case.
 */
const toCamelCase = (str) => {
  return str.camelCase();
};
