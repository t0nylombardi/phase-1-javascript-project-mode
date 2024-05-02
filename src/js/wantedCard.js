import { WantedController } from './controllers/wantedController.js';

const Wanted = new WantedController();

/**
 * Renders a card for a wanted person.
 * @param {Object} person - The wanted person object.
 */
export const renderCard = (person) => {
  const wantedCard = document.getElementById('wantedCard');
  const container = document.createElement('div');
  container.innerHTML = renderHtml(person);
  wantedCard.appendChild(container);
  updateListeners('#updateBtn', handleUpdateEvent);
  updateListeners('#deleteBtn', handleDeleteEvent);
};

/**
 * Checks if a value is null or undefined and returns a default value if so.
 * @param {*} value - The value to check.
 * @returns {*} The original value if not null or undefined, otherwise 'N/A'.
 */
const isNull = (value) => {
  return value ? value : 'N/A';
};

/**
 * Renders the HTML structure for the card of a wanted person.
 * @param {Object} person - The wanted person object.
 * @returns {string} The HTML structure for the card.
 */
const renderHtml = (person) => {
  const {
    id,
    details,
    description,
    images,
    title,
    url,
  } = person;

  return `
  <div id="${id}" class="card">
    <h2>
      <a href=${url} target="_blank">${title}</a>
    </h2>
    <div id="container">
      <div class="col1">
        <div id="wantedCardImages">
          ${renderImages(images, title)}
        </div>
        <div id="wantedCardElaboration">
          ${renderElaboration(details, description)}
        </div>
      </div>
      <div class="col2">
        ${renderDetails(person)}
      </div>
    </div>
    ${renderCardActions()}
  </div>`;
};

/**
 * Renders the image elements for the wanted person.
 * @param {Array} images - The images of the wanted person.
 * @param {string} title - The title of the wanted person.
 * @returns {string} The HTML structure for the images.
 */
const renderImages = (images, title) => {
  return images.slice(0, 2).map(image => `
    <div class="image-wrapper">
      <img src="${image.large}" alt="${title}"/>
      <p>${image.caption ? image.caption : ''}</p>
    </div>
  `).join('');
};

/**
 * Renders the details section of the wanted person card.
 * @param {Object} person - The wanted person object.
 * @returns {string} The HTML structure for the details section.
 */
const renderDetails = (person) => {
  const detailsFromObj = [
    'age_range',
    'eyes',
    'hair',
    'height_max',
    'place_of_birth',
    'race',
    'sex',
    'weight_max',
  ];

  const details = Object.keys(person)
    .filter(key => detailsFromObj.includes(key))
    .reduce((obj, key) => {
      return {...obj, [key]: person[key]};
    }, {});

  return `
  <table class="wanted-person-details">
    <tbody>
      ${Object.keys(details).map(key => `
        <tr>
          <td>${key.removeSeparator().capitalize()}</td>
          <td>${isNull(details[key])}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>`;
};

/**
 * Renders the elaboration section of the wanted person card.
 * @param {string} details - The details of the wanted person.
 * @param {string} description - The description of the wanted person.
 * @returns {string} The HTML structure for the elaboration section.
 */
const renderElaboration = (details, description) => {
  details = details ? details.split('<p></p>').join('') : '';
  description = description ? description.split('<p></p>').join('') : '';

  return details ? `<p>${details}</p>` : description ? `<p>${description}</p>` : '<p>No Details Available</p>';
};

/**
 * Renders the actions section of the wanted person card.
 * @returns {string} The HTML structure for the actions section.
 */
const renderCardActions = () => {
  return `
  <div class="card-actions">
    <div class="list">
      <button id="updateBtn" class="wanted-btn">update</button>
      <button id="deleteBtn" class="wanted-btn">delete</button>
    </div>
  </div>`;
};

/**
 * Handles the update event for a wanted person card.
 * @param {Event} event - The click event.
 */
const handleUpdateEvent = (event) => {
  const personId = event.target.closest('.card').id;
  event.preventDefault();
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }
  // const person = wantedPersons.find(person => person.id === personId);
  // Wanted.updateWantedPerson(personId, person);
};

/**
 * Handles the delete event for a wanted person card.
 * @param {Event} event - The click event.
 */
const handleDeleteEvent = (event) => {
  const personId = event.target.parentElement.parentElement.id;
  console.log('delete', personId);
  // Wanted.deleteWantedPerson(personId);
};

/**
 * Updates event listeners for elements matching the given selector.
 * @param {string} selector - The CSS selector for elements to update listeners.
 * @param {function} handler - The event handler function.
 */
const updateListeners = (selector, handler) => {
  document.querySelectorAll(selector).forEach(btn => btn.addEventListener('click', handler));
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
