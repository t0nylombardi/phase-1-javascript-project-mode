import { WantedController } from './controllers/wantedController.js';
import { isNull } from './utils.js';

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
};

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
      <button class="wanted-btn" type="submit">Submit</button>
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
