import "./weather.module.sass";
import { useState, useEffect } from "react";
import {
  fetchWeatherByCoordinates,
  type WeatherData,
} from "@/services/weatherService";
import { getUserCoordinates } from "@/services/userCoordinatesService";
import WeatherInfo from "@/components/WeatherInfo";
import { FaSpinner } from "react-icons/fa";

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* ============================ Initialize Start ============================ */

  // For better UX, we want to avoid showing and empty page before the user searches
  // We can try to get their browser geolocation, if it's not allowed, fallback to some default value
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

  useEffect(() => {
    fetchInitialData();
  }, []);

  /* ============================= Initialize End ============================= */

  /* ============================== Render Start ============================== */

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="weather-container">
      <div className="weather-info-container">
        {weather ? (
          <WeatherInfo weather={weather} />
        ) : (
          <FaSpinner className="icon__loading" />
        )}
      </div>
    </div>
  );

  /* =============================== Render End =============================== */
};

export default Weather;
