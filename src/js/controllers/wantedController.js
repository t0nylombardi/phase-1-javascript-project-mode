/**
 * Controller class for managing FBI wanted person data through RESTful API calls.
 */
export class WantedController {
  /**
   * Creates an instance of WantedController.
   */
  constructor() {
    /**
     * Base URL of the API.
     * @type {string}
     */
    this.baseUrl = 'http://localhost:3000/wanted';
  }

  /**
   * Retrieves all wanted persons from the server.
   * @returns {Promise<Array<Object>>} A promise that resolves with an array of person objects.
   */
  async getAllWantedPersons() {
    try {
      const response = await fetch(`${this.baseUrl}`);
      if (!response.ok) {
        throw new Error('Failed to fetch wanted persons');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching wanted persons:', error.message);
      throw error;
    }
  }

  /**
   * Retrieves a specific wanted person by ID from the server.
   * @param {number} personId - The ID of the person to retrieve.
   * @returns {Promise<Object>} A promise that resolves with the person object.
   */
  async getWantedPersonById(personId) {
    try {
      const response = await fetch(`${this.baseUrl}/${personId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch person with ID ${personId}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching person with ID ${personId}:`, error.message);
      throw error;
    }
  }

  /**
   * Creates a new wanted person on the server.
   * @param {Object} person - The person object to create.
   * @returns {Promise<Object>} A promise that resolves with the created person object.
   */
  async createWantedPerson(person) {
    try {
      const response = await fetch(`${this.baseUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
      });
      if (!response.ok) {
        throw new Error('Failed to create person');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating person:', error.message);
      throw error;
    }
  }

  /**
   * Updates an existing wanted person on the server.
   * @param {number} personId - The ID of the person to update.
   * @param {Object} updatedPersonData - The updated person data.
   * @returns {Promise<Object>} A promise that resolves with the updated person object.
   */
  async updateWantedPerson(personId, updatedPersonData) {
      console.log('personId', personId);
      console.log('updatedPersonData', updatedPersonData);
      await fetch(`${this.baseUrl}/${personId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPersonData)
      })
      .then(response => {
        if (!response.ok) throw new Error(`Failed to update person with ID ${personId}`);
      })
      .catch(error => {
        console.error(`Error updating person with ID ${personId}:`, error.message);
      });
  }

  /**
   * Deletes a wanted person from the server.
   * @param {number} personId - The ID of the person to delete.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating success.
   */
  async deleteWantedPerson(personId) {
    try {
      const response = await fetch(`${this.baseUrl}/${personId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Failed to delete person with ID ${personId}`);
      }
      return response.ok;
    } catch (error) {
      console.error(`Error deleting person with ID ${personId}:`, error.message);
      throw error;
    }
  }
}
