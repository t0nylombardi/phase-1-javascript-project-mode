
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
  <div class="card">
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
        <p>Age: <span>${isNull(age_range)  }</span></p>
        <p> Sex: <span>${sex}</span></p>
        <p> Race: <span>${isNull(race)}</span></p>
        <p> Height: <span>${isNull(height_min)} lbs - ${isNull(height_max)} lbs</span></p>
        <p> Weight: <span>${isNull(weight_min)} lbs - ${isNull(weight_max)} lbs</span></p>
        <p> Eyes: <span>${isNull(eyes)}</span></p>
        <p> Hair: <span>${isNull(hair)}</span></p>
        <p> Place of Birth: <span>${isNull(place_of_birth)}</span></p>
      </div>
    </div>
  </div>`
}

const renderImages = (images, title) => {
  let img = '';
  images.slice(0,2).forEach((image) => {
    img += `
    <div>
      <img src=${image.large} alt=${title}/>
      <p>${images[1] ? images[1].caption : ''}</p>
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

