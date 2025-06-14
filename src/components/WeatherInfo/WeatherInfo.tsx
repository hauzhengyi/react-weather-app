import { useMemo } from "react";
import { type WeatherData } from "@/services/weatherService";

type Props = { weather: WeatherData; [key: string]: unknown };

const WeatherInfo = ({ weather }: Props) => {
  const localTime = useMemo(() => {
    const { dt, timezone } = weather;
    return new Date((dt + timezone) * 1000).toLocaleString();
  }, [weather]);

  return (
    <>
      <p className="weather-info city">
        {weather.name}, {weather.sys.country}
      </p>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
        alt={weather.weather?.[0].description}
        className="weather-info icon"
      />

      <h2 className="weather-info main">{weather.weather?.[0].main}</h2>

      <p className="weather-info description">
        {weather.weather?.[0].description}
      </p>

      <p className="weather-info temperature">
        Temperature: {weather.main.temp} °C
      </p>

      <p className="weather-info humidity">
        Humidity: {weather.main.humidity}%
      </p>

      <p className="weather-info wind">Wind speed: {weather.wind.speed} m/s</p>

      <p className="weather-info time">Time: {localTime}</p>
    </>
  );
};

export default WeatherInfo;
