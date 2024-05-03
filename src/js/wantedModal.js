import { WantedController } from './controllers/wantedController.js';
import { isNull } from './utils.js';
const Wanted = new WantedController();

export const renderModal = (person) => {
  const modal = document.querySelector('.modal');
  modal.classList.add('open');
  document.body.classList.add('modal-open');

  const modelBody = document.querySelector('.modal-body');
  modelBody.innerHTML += renderModalHtml(person);
}

const renderModalHtml = (person) => {
  const detailsObj = [
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
    <h2 class="title">
      // Enter new details for <span>${person.title.split('-')[0]}</span>
    </h2>
    ${renderForm(person, detailsObj)}
  `;
}


const renderForm = (person, detailsObj) => {
  const details = Object.keys(person)
    .filter(key => detailsObj.includes(key))
    .reduce((obj, key) => {
      return {...obj, [key]: person[key]};
    }, {});

    return `
      <form class="person-details-form">
        ${Object.keys(details).map(key => `
          <div class="variables form-group">
            <span class="variable-type">let</span>
            <span class="variable-name">${key.camelCase()}</span>
            <span class="variable-assignment">=</span>
            <input
              type="text"
              class="variable-value"
              id="${key}"
              name="${key}"
              value="${isNull(details[key])}">
          </div>
        `).join('')}
        <button type="submit">Update</button>
      </form>
    `;
}

