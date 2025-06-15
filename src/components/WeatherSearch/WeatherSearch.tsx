import "./weather-search.sass";
import { useState, useEffect } from "react";
import {
  fetchCitySuggestions,
  type GeocodingData,
} from "@/services/geocodingService";
import { FaSpinner } from "react-icons/fa";

type Props = {
  onSearch: (cityName: string, countryCode: string) => void;
};

const WeatherSearch = ({ onSearch }: Props) => {
  /* ================================= States ================================= */
  const [cityName, setCityName] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [suggestions, setSuggestions] = useState<GeocodingData[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  /* ================================= States ================================= */

  /* ================================= Methods ================================ */
  const handleInputCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUserTyping(true);
    setCityName(e.target.value);
  };

  const handleInputCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUserTyping(true);
    setCountryCode(e.target.value);
  };

  const clearInput = () => {
    setIsUserTyping(false);
    setCityName("");
    setCountryCode("");
    setSuggestions([]);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUserTyping(false);
    onSearch(cityName.trim(), countryCode.trim());
    setSuggestions([]);
  };

  const onClickSuggestion = ({ name, country }: GeocodingData) => {
    setIsUserTyping(false);
    setCityName(name);
    setCountryCode(country);
    onSearch(name, country);
    setSuggestions([]);
  };
  /* ================================= Methods ================================ */

  /* ================================= Effects ================================ */
  useEffect(() => {
    // Only suggest when user is typing, not when they click a suggestion
    if (!isUserTyping) return;

    const fetchSuggestions = async () => {
      // Don't fetch if city name is less than 2 characters
      if (cityName.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        setLoadingSuggestions(true);
        const data = await fetchCitySuggestions(cityName, countryCode);
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    // Use debounce to avoid triggering a fetch on every keystroke
    const debounce = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(debounce);
  }, [cityName, countryCode, isUserTyping]);
  /* ================================= Effects ================================ */

  return (
    <div className="weather-search__container container">
      <form className="weather-search__form" onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="City"
          value={cityName}
          onChange={handleInputCity}
          required
        />
        <input
          type="text"
          placeholder="Country code"
          value={countryCode}
          onChange={handleInputCountry}
        />
        <button type="submit" className="button button__accent">
          Search
        </button>
        <button type="button" className="button" onClick={clearInput}>
          Clear
        </button>
      </form>

      {loadingSuggestions ? (
        <FaSpinner className="icon__loading" />
      ) : (
        suggestions.length > 0 && (
          <div className="weather-search__suggestions">
            <ul>
              {suggestions.map((s, index) => (
                <li
                  key={`${s.name}-${s.country}-${index}`}
                  onClick={() => onClickSuggestion(s)}
                >
                  {s.name}, {s.country}
                </li>
              ))}
            </ul>
            <p>
              <i>
                Suggestions are provided by Openweathermap's Geocoding API.
                Cities shown here are not guaranteed to be found in their
                weather API.
              </i>
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherSearch;
