const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format


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
    console.log('Data', data);
    if (data && data.persons.length === 0) {
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
  try {
    const responseData = await fetchData('https://api.fbi.gov/wanted/v1/list');

    // Check if response data is valid and lastUpdated date is not today
    if (responseData && responseData.lastUpdated !== currentDate) {
      const totalPages = 4; // only looping through 4 pages of data
      const fetchPromises = [];

      const timer = ms => new Promise(res => setTimeout(res, ms)); // Timer function to avoid rate limiting
      for (let page = 1; page <= totalPages; page++) {
        const uri = `https://api.fbi.gov/wanted/v1/list?page=${page}`;
        const data = await fetchData(uri);
        console.log(`Fetched page ${page}: ${data.items.length} items.`);
        if (data && data.items) {
          fetchPromises.push(...data.items.map(PopulateDb));
        }
        await timer(1000); // Wait for 1 second to avoid rate limiting  (1000ms = 1s)
      }

      await Promise.all(fetchPromises);
      console.log(`${fetchPromises.length} items added to the database.`);
    } else {
      console.log("Data is up to date.");
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

    // Construct the request body
    const requestBody = {
      lastUpdated: currentDate,
      persons: {
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
      } // Populate persons with the provided person object
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
    const response = await fetch('http://localhost:3000/wanted', requestOptions);

    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    console.log('Data sent successfully:', await response.json());
  } catch (error) {
    console.error('Error sending data:', error);
  }
};
