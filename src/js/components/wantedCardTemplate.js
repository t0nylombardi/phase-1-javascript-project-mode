import { WantedController } from '../controllers/wantedController.js';

const Wanted = new WantedController();

export const renderCard = (person) => {
  const wantedCard = document.getElementById('wantedCard');
  const container = document.createElement('div');
  container.innerHTML = renderHtml(person)
  wantedCard.appendChild(container);

  // Update Listeners
  document.querySelectorAll('#updateBtn')
    .forEach(btn => btn.addEventListener('click', handleUpdateEvent));

  // Delete Listeners
  document.querySelectorAll('#deleteBtn')
    .forEach(btn => btn.addEventListener('click', handleDeleteEvent));
}

const isNull = (value) => {
  return value ? value : 'N/A';
}

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
    <h2>${title}</h2>
    <div id="container">
      <div class="col1">
        <div id="wantedCardImages">
          ${renderImages(images, title)}
        </div>
        <div id="wantedCardElaboration">
          ${renderElaboration(details, description)}
          <a href=${url} target="_blank">More Info</a>
        </div>
      </div>
      <div class="col2">
        ${renderDetails(person)}
      </div>
    </div>
    ${renderCardActions(title, url)}
  </div>`;
}

const renderImages = (images, title) => {
  let img = '';
  images.slice(0,2).forEach((image) => {
    img += `
    <div class="image-wrapper">
      <img src=${image.large} alt=${title}/>
      <p>${image.caption ? image.caption : ''}</p>
    </div>
    `;
  });
  return img;
}

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
  ]

  const details = Object.keys(person)
  .filter(key => detailsFromObj.includes(key))
  .reduce((obj, key) => {
    return {...obj, [key]: person[key]};
  }, {});

  return `
  <table class="wanted-person-details">
    <tbody>
      ${
        Object.keys(details).map(key => {
          return `<tr>
            <td>${key.removeSeparator().capitalize()}</td>
            <td>${isNull(details[key])}</td>
          </tr>`;
        }).join('')
      }
    </tbody>
  </table>`;
}

const renderElaboration = (details, description) => {
  if (details) {
    return `<p>${details}</p>`
  } else if (description) {
    return `<p>${description}</p>`;
  } else {
    return '<p>No Details Available</p>';
  }
}

const renderCardActions = (title, url) => {
  return `
  <div class="card-actions">
    <div class="list">
      <button id="updateBtn" class='wanted-btn'>update</button>
      <button id="deleteBtn" class='wanted-btn'>delete</button>
    </div>
  </div>`;
}

const handleUpdateEvent = (event) => {
  const personId = event.target.closest('.card').id;
  event.preventDefault();
  const modal = document.querySelector('.update-modal');
  modal.classList.add('open');
  document.body.classList.add('update-modal-open');

  // const person = wantedPersons.find(person => person.id === personId);

  // Wanted.updateWantedPerson(personId, person);
}

const handleDeleteEvent = (event) => {
  const personId = event.target.parentElement.parentElement.id;
  console.log('delete', personId);
  // Wanted.deleteWantedPerson(personId);
}

const getKeyByValue = (obj, val) => {
  return Object.keys(obj).find(key => obj[key] === val);
}

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'removeSeparator', {
  value: function() {
    return this.split('_').filter(Boolean).join(' ');;
  },
  enumerable: false
});