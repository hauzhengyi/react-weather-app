const API_KEY = "5c942189e161aba0cfa4feabdbdb7da4";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

/**
 * Fetches current weather data for the specified city and country code.
 *
 * @param {string} cityName - The name of the city (e.g. "Kuala Lumpur").
 * @param {string} countryCode - The ISO country code (e.g. "MY").
 * @returns {Promise<WeatherData>}
 */
export const fetchWeatherByCity = (
  cityName: string,
  countryCode: string
): Promise<WeatherData> => {
  return fetchWeather({ q: `${cityName},${countryCode}` });
};

/**
 * Fetches current weather data for the specified latitude and longitude.
 *
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @returns {Promise<WeatherData>}
 */
export const fetchWeatherByCoordinates = (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  return fetchWeather({
    lat: String(lat),
    lon: String(lon),
  });
};

/**
 * Internal helper that performs the API request.
 *
 * @param {Record<string, string>} params - Query parameters for the API call.
 * @returns {Promise<WeatherData>}
 * @throws {Error}
 */
const fetchWeather = async (
  params: Record<string, string>
): Promise<WeatherData> => {
  const queryString = new URLSearchParams({
    ...params,
    appid: API_KEY,
    units: "metric",
  }).toString();

  const url = `${BASE_URL}?${queryString}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 404)
      throw new Error("Sorry, no weather data avaiable for this location.");
    throw new Error(data.message);
  }

  return data;
};
