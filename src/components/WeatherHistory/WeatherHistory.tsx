import "./weather-history.sass";
import { useState, useEffect } from "react";
import { CiSearch, CiTrash } from "react-icons/ci";

export type WeatherEntry = {
  cityName: string;
  countryCode: string;
  time: string;
};

type Props = {
  newEntry?: WeatherEntry;
  onSearch: (cityName: string, countryCode: string) => void;
};

const LOCAL_STORAGE_KEY = "weather_search_history";

const WeatherHistory = ({ newEntry, onSearch }: Props) => {
  /* ================================= States ================================= */
  const [history, setHistory] = useState<WeatherEntry[]>([]);
  /* ================================= States ================================= */

  /* ================================= Effects ================================ */
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (newEntry) {
      setHistory((prev) => {
        const updated = [newEntry, ...prev].slice(0, 10);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    }
  }, [newEntry]);
  /* ================================= Effects ================================ */

  /* ================================= Methods ================================ */

  const handleDelete = (indexToDelete: number) => {
    setHistory((prev) => {
      const updated = prev.filter((_, index) => index !== indexToDelete);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  /* ================================= Methods ================================ */

  return (
    <div className="weather__history">
      <div className="container">
        <h3>Search History</h3>
        {history.length === 0 ? (
          <p>No search history yet.</p>
        ) : (
          <ul className="list">
            {history.map((item, index) => (
              <li className="list-item" key={index}>
                <div className="number">{index + 1}</div>
                <div className="content">
                  {item.cityName}, {item.countryCode}
                </div>
                <div className="time">{item.time}</div>
                <button
                  type="button"
                  className="button search-button"
                  onClick={() => onSearch(item.cityName, item.countryCode)}
                >
                  <CiSearch />
                </button>
                <button
                  type="button"
                  className="button delete-button"
                  onClick={() => handleDelete(index)}
                >
                  <CiTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WeatherHistory;
