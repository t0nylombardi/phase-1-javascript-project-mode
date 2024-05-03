import { WantedController } from './controllers/wantedController.js';
import { renderModal } from './wantedModal.js';
import { isNull } from './utils.js';

const Wanted = new WantedController();

/**
 * Renders a card for a wanted person.
 * @param {Object} person - The wanted person object.
 */
export const renderCard = (person) => {
  const wantedCard = document.getElementById('wantedCard');
  const cardContainer = document.createElement('div');
  cardContainer.innerHTML = renderCardHtml(person);
  wantedCard.appendChild(cardContainer);
  updateListeners('#updateBtn', handleUpdateEvent);
  updateListeners('#deleteBtn', handleDeleteEvent);
};

/**
 * Renders the HTML structure for the card of a wanted person.
 * @param {Object} person - The wanted person object.
 * @returns {string} The HTML structure for the card.
 */
const renderCardHtml = (person) => {
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
      <div id="container" class="card-container">
        <div class="col1">
          <div id="wantedCardImages">
            ${renderImagesHtml(images, title)}
          </div>
          <div id="wantedCardElaboration">
            ${renderElaborationHtml(details, description)}
          </div>
        </div>
        <div class="col2">
          ${renderDetailsHtml(person)}
        </div>
      </div>
      ${renderCardActionsHtml()}
    </div>`;
};

/**
 * Renders the image elements for the wanted person.
 * @param {Array} images - The images of the wanted person.
 * @param {string} title - The title of the wanted person.
 * @returns {string} The HTML structure for the images.
 */
const renderImagesHtml = (images, title) => {
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
const renderDetailsHtml = (person) => {
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
const renderElaborationHtml = (details, description) => {
  details = details ? details.split('<p></p>').join('') : '';
  description = description ? description.split('<p></p>').join('') : '';

  return details ? `<p>${details}</p>` : description ? `<p>${description}</p>` : '<p>No Details Available</p>';
};

/**
 * Renders the actions section of the wanted person card.
 * @returns {string} The HTML structure for the actions section.
 */
const renderCardActionsHtml = () => {
  return `
    <div class="card-actions">
      <div class="list">
        <button id="updateBtn" class="wanted-btn">update</button>
        <button id="deleteBtn" class="wanted-btn">delete</button>
      </div>
    </div>`;
};

/**
 * Opens the modal with the details of a wanted person.
 * @param {Event} event - The click event.
 */
const handleUpdateEvent = async (event) => {
  const personId = event.target.closest('.card').id;
  try {
    const person = await Wanted.getWantedPersonById(personId);
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.classList.add('open');
      document.body.classList.add('modal-open');
      renderModal(person);
    }
  } catch (error) {
    console.error('Error fetching person:', error.message);
  }
};

/**
 * Handles the delete event for a wanted person card.
 * @param {Event} event - The click event.
 */
function handleDeleteEvent(event) {
  const personId = event.target.closest('.card').id;
  renderAlert(personId);
}

/**
 * Renders an alert for deleting a wanted person.
 * @param {string} personId - The id of the person to delete.
 */
const renderAlert = (personId) => {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    <strong>Danger, Will Robinson!</strong> Are you sure you want to delete this person?
    <div class="alert-actions">
      <button class="alert-btn cancel">Cancel</button>
      <button class="alert-btn delete">Delete</button>
    </div>
  `;
  document.body.appendChild(alert);
  document.querySelectorAll('.alert-btn').forEach(btn => {
    btn.addEventListener('click', handleAlertEvent(personId));
  });
};

/**
 * Handles the alert event for a wanted person card.
 * @param {string} personId - The id of the person to delete.
 */
function handleAlertEvent(personId) {
  return function(event) {
    const alert = event.target.closest('.alert');
    if (event.target.classList.contains('delete')) {
      Wanted.deleteWantedPerson(personId);

      // Remove the card and the alert
      document.getElementById(personId).remove();
      alert.remove();
    } else {
      alert.remove();
    }
  };
}

/**
 * Updates event listeners for elements matching the given selector.
 * @param {string} selector - The CSS selector for elements to update listeners.
 * @param {function} handler - The event handler function.
 */
const updateListeners = (selector, handler) => {
  document.querySelectorAll(selector).forEach(btn => btn.addEventListener('click', handler));
};
