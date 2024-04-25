
export const renderCard = (person) => {
  const wantedCard = document.getElementById('wantedCard');

  const card = document.createElement('div');
  card.innerHTML = renderHtml(person)
  wantedCard.appendChild(card);
}

const isNull = (value) => {
  return value ? value : 'N/A';
}

const renderHtml = (person) => {
  const {
    id,
    age_range,
    details,
    description,
    eyes,
    hair,
    height_max,
    height_min,
    images,
    place_of_birth,
    race,
    sex,
    title,
    url,
    weight_max,
    weight_min,
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
        <table class="wanted-person-details">
          <tbody>
            <tr>
              <td>Age:</td>
              <td id="${id}" name="age" class="detail-value">${isNull(age_range)  }</td>
            </tr>
            <tr>
              <td>Sex:</td>
              <td id="${id}" name="sex" class="detail-value">${sex}</td>
            </tr>
            <tr>
              <td>Race:</td>
              <td id="${id}" name="race" class="detail-value">${race}</td>
            </tr>
            <tr>
              <td>Height:</td>
              <td id="${id}" name="height" class="detail-value">${isNull(height_min)} lbs - ${isNull(height_max)} lbs</td>
            </tr>
            <tr>
              <td>Weight:</td>
              <td id="${id}" name="weight" class="detail-value">${isNull(weight_min)} lbs - ${isNull(weight_max)} lbs</td>
            </tr>
            <tr>
              <td>Eyes:</td>
              <td id="${id}" name="eyes" class="detail-value">${isNull(eyes)}</td>
            </tr>
            <tr>
              <td>Hair:</td>
              <td id="${id}" name="hair" class="detail-value">${isNull(hair)}</td>
            </tr>
            <tr>
              <td>Place Of Birth:</td>
              <td id="${id}" name="placeOfBirth" class="detail-value">${isNull(place_of_birth)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    ${renderCardActions(title, url)}
  </div>`;
}

const renderImages = (images, title) => {
  let img = '';
  images.slice(0,2).forEach((image) => {
    img += `
    <div>
      <img src=${image.large} alt=${title}/>
      <p>${image.caption ? image.caption : ''}</p>
    </div>
    `;
  });
  return img;
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

      <a class="wanted-btn" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url}" target="_blank">X/Twitter</a>

      <a class="wanted-btn" href="https://www.facebook.com/sharer/sharer.php?u=${url}&t=${encodeURIComponent(title)}" target="_blank">FaceBook</a>

      <a class="wanted-btn" href="mailto:?Subject=${encodeURIComponent(title)}&body=${url}" target="_blank">Email</a>
    </div>`;
}
