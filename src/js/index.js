// FBI Wanted 
// items array
// fetch data from FBI API
 // destructure data into items array
let hair, title, place_of_birth, weight, race, eyes, age_range, details, sex, images, height_max, height_min, weight_min, weight_max, url;

fetch('https://api.fbi.gov/wanted/v1/list')
  .then(response => response.json())
  .then(data => {
    const items = data.items;
    items.forEach(item => {
      if (item.details != null) renderCard(item);
    });
  })
  .catch(error => console.error(error));


const renderCard = (item) => {
  const {hair, title, place_of_birth, race, eyes, age_range, details, sex, images, height_max, height_min, weight_min, weight_max, url} = item;

  const wantedCard = document.getElementById('wantedCard');
  const card = document.createElement('div');
  card.innerHTML = `
  <div class="card">
    <h2>${title}</h2>
    <div id="container">
      <div class="col1">
        <div id="wantedCardImages">
          <div>
            <img src=${images[0].large} alt=${title} />
          </div>
          <div>
            <img src=${images[1].large} alt=${title} />
            <p>${images[1].caption}</p>
          </div>
        </div>
        <div id="wantedCardDetails">
          ${details}
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
  </div>
  `
  wantedCard.appendChild(card);
}

const isNull = (value) => {
  return value ? value : 'N/A';
}