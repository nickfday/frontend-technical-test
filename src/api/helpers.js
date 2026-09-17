/**
 * A utility function to make a network api call
 *
 * @param {string} apiUrl
 * @param {RequestInit} [options]
 * @return {Promise<Object>}
 */
export async function request(apiUrl, options) {
  const response = await fetch(apiUrl, options);

  if (!response.ok) {
    throw new Error(`Request Failed with status ${response.status}`);
  }

  return response.json();
}
