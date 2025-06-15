import "./weather-info.sass";
import { type WeatherData } from "@/services/weatherService";
import { dateFormatter } from "@/utils/dateFormatter";

type Props = { weather: WeatherData; [key: string]: unknown };

const WeatherInfo = ({ weather }: Props) => {
  return (
    <>
      <p className="weather-info__city">
        {weather.name}, {weather.sys.country}
      </p>

      <h2 className="weather-info__main">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
          alt={weather.weather?.[0].description}
          className="weather-info__icon"
        />
        {weather.weather?.[0].main}
      </h2>

      <p className="weather-info__description">
        {weather.weather?.[0].description}
      </p>

      <p className="weather-info__coordinates">
        Coordinates: {weather.coord.lat}, {weather.coord.lon}
      </p>

      <p className="weather-info__temperature">
        Temperature: {weather.main.temp} °C
      </p>

      <p className="weather-info__humidity">
        Humidity: {weather.main.humidity}%
      </p>

      <p className="weather-info__wind">Wind speed: {weather.wind.speed} m/s</p>

      <p className="weather-info__time">
        Time: {dateFormatter(weather.dt, weather.timezone)}
      </p>
    </>
  );
};

export default WeatherInfo;
