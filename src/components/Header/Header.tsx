import "./header.sass";
import { useState, useEffect } from "react";
import Theme from "@/components/Theme";

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header>
      <div className="header__container container">
        <div className="header__brand">
          <div className="title">
            <img
              src="/react-weather-app/favicon.ico"
              alt="logo"
              className="logo"
            />
            <h1>Today's Weather</h1>
          </div>
          <p className="description">
            Get live weather forecast from all around the world!
          </p>
        </div>
        <div className="header__local-time">
          <div className="time">{time.toLocaleTimeString().toUpperCase()}</div>
          <div className="details">
            <div className="title">Local Time</div>
            <div className="date">{time.toLocaleDateString()}</div>
          </div>
        </div>
        <Theme />
      </div>
    </header>
  );
};

export default Header;
