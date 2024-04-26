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
  try {
    const data = await fetchData('https://api.fbi.gov/wanted/v1/list');
    if (data && data.items) {
      await Promise.all(data.items.map(PopulateDb));
      console.log(`${data.items.length} items added to the database.`);
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Populates the database with information about a wanted person.
 * @param {Object} person - The wanted person's information.
 * @returns {Promise<void>} - A Promise that resolves when the person's information is stored in the database.
 */
const PopulateDb = async (person) => {
  try {
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
    await fetch('http://localhost:3000/wanted', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
    });
  } catch (error) {
    console.error(error);
  }
};