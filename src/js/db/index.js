/**
 * Fetches data from the specified URL.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object|null>} - A Promise resolving to the fetched data or null if an error occurs.
 */
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Loads the database, fetches wanted data, and populates the database if necessary.
 * @returns {Promise<void>} - A Promise that resolves when the database is loaded.
 */
export const loadDB = async () => {
  try {
    const data = await fetchData('http://localhost:3000/wanted');
    if (data && data.length === 0) {
      console.log('fetching data from FBI API...');
      await fetchFbiApi();
    }
    console.log(`${data.length} items loaded from the database.`);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetches data from the FBI API and populates the database.
 * @returns {Promise<void>} - A Promise that resolves when the data is fetched and the database is populated.
 */
const fetchFbiApi = async () => {
  // Check if response data is valid
  const totalPages = 4; // only looping through 4 pages of data
  const fetchPromises = [];

  for (let page = 1; page <= totalPages; page++) {
    const uri = `https://api.fbi.gov/wanted/v1/list?page=${page}`;
    await fetchData(uri).then((response) => {
      return response;
    }).then((data) => {
      if (data && data.items) {
        fetchPromises.push(...data.items);
        data.items.forEach(PopulateDb);
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }
  console.log(`${fetchPromises.length} items added to the database.`);
};

/**
 * Populates the database with information about a wanted person.
 * @param {Object} person - The wanted person's information.
 * @returns {Promise<void>} - A Promise that resolves when the person's information is stored in the database.
 */
const PopulateDb = async (person) => {
  // Construct the request body
  const requestBody = {
    age_range: person.age_range,
    details: person.details,
    description: person.description,
    eyes: person.eyes,
    hair: person.hair,
    height_max: person.height_max,
    height_min: person.height_min,
    images: person.images,
    place_of_birth: person.place_of_birth,
    race: person.race,
    sex: person.sex,
    title: person.title,
    url: person.url,
    weight_max: person.weight_max,
    weight_min: person.weight_min,
  };

  // Construct the request options
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  };

  // Send the request
  await fetch('http://localhost:3000/wanted', requestOptions).then((response) => {
    // Check if the response is ok
    if (response.status >= 400 && response.status < 600) {
      throw new Error("Bad response from server");
    }
  }).catch((error) => {
    // Handle errors
    console.error('Error sending data:', error);
  });
};
