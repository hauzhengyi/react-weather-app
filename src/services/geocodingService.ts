const API_KEY = "5c942189e161aba0cfa4feabdbdb7da4";
const BASE_URL = "http://api.openweathermap.org/geo/1.0/direct";

export interface GeocodingData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

/**
 * Fetches up to 5 city suggestions matching the provided city name using the OpenWeatherMap Geocoding API.
 *
 * @param {string} cityName - The name (or partial name) of the city to search for.
 * @param {string} countryCode - The ISO country code (e.g. "MY").
 * @returns {Promise<GeocodingData[]>}
 * @throws {Error}
 */
export const fetchCitySuggestions = async (
  cityName: string,
  countryCode: string
): Promise<GeocodingData[]> => {
  const queryString = new URLSearchParams({
    q: countryCode ? `${cityName},${countryCode}` : `${cityName}`,
    limit: "5",
    appid: API_KEY,
  }).toString();

  const url = `${BASE_URL}?${queryString}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};
