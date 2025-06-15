import "./weather.sass";
import { useState, useEffect } from "react";
import {
  fetchWeatherByCity,
  fetchWeatherByCoordinates,
  type WeatherData,
} from "@/services/weatherService";
import { getUserCoordinates } from "@/services/userCoordinatesService";
import WeatherInfo from "@/components/WeatherInfo";
import WeatherSearch from "@/components/WeatherSearch";
import { FaSpinner } from "react-icons/fa";

const HISTORY_LENGTH = 10;

const Weather = () => {
  /* ================================= States ================================= */
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<
    { cityName: string; countryCode: string; time: string }[]
  >([]);
  /* ================================= States ================================= */

  /* ================================= Methods ================================ */
  const getWeatherByCity = async (cityName: string, countryCode: string) => {
    try {
      const data = await fetchWeatherByCity(cityName, countryCode);
      setWeather(data);
      setError(null);
      setHistory(
        [
          {
            cityName: data.name,
            countryCode: data.sys.country,
            time: new Date().toLocaleString().toUpperCase(),
          },
          ...history,
        ].slice(0, HISTORY_LENGTH)
      );
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error.");
    }
  };
  /* ================================= Methods ================================ */

  /* ================================= Effects ================================ */
  // For better UX, we want to avoid showing and empty page before the user searches
  // We can try to get their browser geolocation, if the user allows
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { lat, lon } = await getUserCoordinates();
        const data = await fetchWeatherByCoordinates(lat, lon);
        setWeather(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error.");
      }
    };

    fetchInitialData();
  }, []);
  /* ================================= Effects ================================ */

  return (
    <div className="weather__container">
      <WeatherSearch onSearch={getWeatherByCity} />

      {error ? (
        <div>{error}</div>
      ) : (
        <div className="weather__info">
          {weather ? (
            <WeatherInfo weather={weather} />
          ) : (
            <FaSpinner className="icon__loading" />
          )}
        </div>
      )}

      {!!history.length &&
        history.map((h) => (
          <div>
            {h.cityName} {h.countryCode} {h.time}
          </div>
        ))}
    </div>
  );
};

export default Weather;
