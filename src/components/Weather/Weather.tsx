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
import WeatherHistory from "@/components/WeatherHistory";

const Weather = () => {
  /* ================================= States ================================= */
  const [weather, setWeather] = useState<WeatherData | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [newEntry, setNewEntry] = useState<
    | {
        cityName: string;
        countryCode: string;
        time: string;
      }
    | undefined
  >();
  /* ================================= States ================================= */

  /* ================================= Methods ================================ */
  const getWeatherByCity = async (cityName: string, countryCode: string) => {
    try {
      const data = await fetchWeatherByCity(cityName, countryCode);
      setWeather(data);
      setError(undefined);
      setNewEntry({
        cityName: data.name,
        countryCode: data.sys.country,
        time: new Date().toLocaleString().toUpperCase(),
      });
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

      <WeatherInfo weather={weather} error={error} />

      <WeatherHistory newEntry={newEntry} onSearch={getWeatherByCity} />
    </div>
  );
};

export default Weather;
