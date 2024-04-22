/**
 * WantedController class for managing FBI wanted person data through RESTful API calls.
 */
export class WantedController {
  /**
   * Creates an instance of WantedController.
   */
  constructor() {
    this.baseUrl = 'http://localhost:3000/wanted';
  }

  /**
   * Retrieves all wanted people from the server.
   * @returns {Promise<Array>} A promise that resolves with an array of person objects.
   */
  async getAllPersons() {
    const response = await fetch(`${this.baseUrl}`);
    return await response.json();
  }

  /**
   * Retrieves a specific person by ID from the server.
   * @param {number} PersonId - The ID of the person to retrieve.
   * @returns {Promise<Object>} A promise that resolves with the person object.
   */
  async getPersonById(personId) {
    const response = await fetch(`${this.baseUrl}/${personId}`);
    return await response.json();
  }

  /**
   * Creates a new person on the server.
   * @param {Object} person - The person object to create.
   * @returns {Promise<Object>} A promise that resolves with the created person object.
   */
  async createPerson(person) {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person)
    });
    return await response.json();
  }

  /**
   * Updates an existing person on the server.
   * @param {number} personId - The ID of the person to update.
   * @param {Object} updatedPersonData - The updated person data.
   * @returns {Promise<Object>} A promise that resolves with the updated person object.
   */
  async updatePerson(personId, updatedPersonData) {
    const response = await fetch(`${this.baseUrl}/${personId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPersonData)
    });
    return await response.json();
  }

  /**
   * Deletes a person from the server.
   * @param {number} personId - The ID of the person to delete.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating success.
   */
  async deletePerson(personId) {
    const response = await fetch(`${this.baseUrl}/${personId}`, {
      method: 'DELETE'
    });
    return response.ok;
  }
}