// As a user, I want the application to load smoothly upon opening, displaying a
// list of wanted people, and providing search functionality for quick access.
// Additionally, I expect the application to respond seamlessly to my interactions,
// such as typing in the search box or clicking on buttons.
// Furthermore, I desire the ability to easily customize strings, enabling me to
// format text according to my preferences.

import { renderCard } from "./wantedCard.js";
import { loadDB } from "./db/db.js";
import { env } from "./utils.js";

/**
 * Initializes the application.
 * @function init
 * @returns {void}
 */
const init = async () => {
  await loadDB();
  showWanted();
  addEventListeners();
};

/**
 * Fetches wanted people from the server and renders them.
 * @function showWanted
 * @returns {void}
 */
const showWanted = async () => {
  console.log("Fetching wanted people...");
  await fetch(env.API_URL || "http://127.0.0.1:3000/wanted")
    .then((response) => response.json())
    .then((data) =>
      data.forEach((person) => {
        renderCard(person);
      })
    )
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
};

const handleSearchEvent = (event) => {
  const searchTerm = event.target.value.trim().toLowerCase();
  const cards = document.querySelectorAll("div.card");
  cards.forEach((card) => {
    card.style.display = "revert";
    if (!card.innerText.toLowerCase().includes(searchTerm)) {
      card.style.display = "none";
    }
  });
};

/**
 * Adds event listeners to the search box and modal.
 * @function addEventListeners
 * @returns {void}
 * @listens searchbox:keyup
 * @listens document:click
 */
const addEventListeners = () => {
  document
    .getElementById("searchbox")
    .addEventListener("keyup", handleSearchEvent);
};

// Define prototype methods

/**
 * Capitalizes the first letter of a string.
 * @returns {string} The capitalized string.
 */
Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

/**
 * Removes separators from a string and converts it to title case.
 * @returns {string} The title cased string.
 */
Object.defineProperty(String.prototype, "removeSeparator", {
  value: function () {
    return this.split("_").filter(Boolean).join(" ");
  },
  enumerable: false,
});

/**
 * Converts a string to camel case.
 * @returns {string} The camel cased string.
 */
Object.defineProperty(String.prototype, "camelCase", {
  value: function () {
    return this.removeSeparator()
      .split(" ")
      .map((word, index) => {
        return index === 0 ? word.toLowerCase() : word.capitalize();
      })
      .join("");
  },
  enumerable: false,
});

document.addEventListener("DOMContentLoaded", init);
