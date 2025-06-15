import "./weather-info.sass";
import { useMemo } from "react";
import { type WeatherData } from "@/services/weatherService";
import { dateFormatter } from "@/utils/dateFormatter";
import { FaSpinner, FaLocationArrow } from "react-icons/fa";
import { FaDroplet, FaGlobe, FaTemperatureHalf, FaWind } from "react-icons/fa6";

type Props = { weather?: WeatherData; error?: string; [key: string]: unknown };

const WeatherInfo = ({ weather, error }: Props) => {
  /* ================================== Memos ================================= */
  const weatherCondition = useMemo(() => {
    if (!weather) return "";
    const id = weather.weather?.[0]?.id;
    if (!id) return "";
    if (id >= 200 && id <= 232) return "thunder";
    if (id >= 300 && id <= 321) return "drizzle";
    if (id >= 500 && id <= 531) return "rain";
    if (id >= 600 && id <= 622) return "snow";
    if (id >= 701 && id <= 781) return "fog";
    if (id === 800) return "clear";
    if (id >= 801) return "cloud";
  }, [weather]);

  const dayNight = useMemo(() => {
    if (!weather) return "";
    const code: string = weather.weather?.[0]?.icon.slice(-1);
    if (code === "d") return "day";
    if (code === "n") return "night";
    return "";
  }, [weather]);
  /* ================================== Memos ================================= */

  return (
    <>
      <div
        className={`weather-info__wallpaper ${weatherCondition} ${dayNight}`}
      />

      {error ? (
        <div className="container">
          <div className="weather-info__container error">
            <div className="error-message">{error}</div>
          </div>
        </div>
      ) : weather ? (
        <div className="container">
          <div className="weather-info__container">
            <div className="city">
              <FaLocationArrow className="location-icon" /> {weather.name},{" "}
              {weather.sys.country}
            </div>

            <h2 className="main">{weather.weather?.[0].main}</h2>

            <div className="description">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
                alt={weather.weather?.[0].description}
                className="weather-icon"
              />
              <div className="label">{weather.weather?.[0].description}</div>
            </div>

            <div className="statGrid">
              <div className="stat coordinates">
                <div className="value">
                  {weather.coord.lat}, {weather.coord.lon}
                </div>
                <div className="title">
                  <FaGlobe className="icon coord" /> Coordinates
                </div>
              </div>
              <div className="stat temperature">
                <div className="value">{weather.main.temp} °C</div>
                <div className="title">
                  <FaTemperatureHalf className="icon temp" /> Temperature
                </div>
              </div>
              <div className="stat humidity">
                <div className="value">{weather.main.humidity}%</div>
                <div className="title">
                  <FaDroplet className="icon humi" /> Humidity
                </div>
              </div>
              <div className="stat wind">
                <div className="value">{weather.wind.speed} m/s</div>
                <div className="title">
                  <FaWind className="icon wind" /> Wind speed
                </div>
              </div>
            </div>

            <div className="time">
              {dateFormatter(weather.dt, weather.timezone)}
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="weather-info__container">
            <FaSpinner className="icon__loading" />
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherInfo;
