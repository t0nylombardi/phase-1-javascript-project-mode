/**
 * Check if the value is null or undefined
 * @param {string} value - The value to check.
 * @returns {string} The value or 'N/A'.
 */
export const isNull = (value) => {
  return value ? value : "N/A";
};

export const env = {
  API_URL: "http://147.182.158.161:3000/wanted",
  FBI_API: "https://api.fbi.gov/wanted/v1/list",
};
