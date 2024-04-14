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
      ({ hair, title, place_of_birth, weight, race, eyes, age_range, details, sex, images, height_max, height_min, weight_min, weight_max, url } = item);
      console.log(hair, title, place_of_birth, weight);
    });
    console.log(data);
  })
  .catch(error => console.error(error));


