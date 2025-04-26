import { useState } from "react";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";

function App() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") {
      setSearchedCity(city.trim());
    }
  };

  return (
    <>
      <div className="min-vh-100 bg-light d-flex flex-column">
        <Header />

        <div className="container py-5 text-center">
          <h2 className="mb-3">Welcome to the Weather App</h2>
          <p className="text-muted">
            Start by entering a city to get the current weather and map!
          </p>

          <div className="d-flex justify-content-center mb-4">
            <input
              type="text"
              className="form-control w-50 me-2 shadow-sm"
              name="city"
              placeholder="Enter city or village..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ borderColor: "#0d6efd", outline: "none" }}
            />
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={handleSearch}
            >
              Search&nbsp;🔎
            </button>
          </div>

          {/* Show WeatherCard and Forecast after search */}
          {searchedCity && (
            <>
              <WeatherCard city={searchedCity} />
              <Forecast city={searchedCity} />
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-auto py-3 bg-dark text-light">
          Made with ❤️ by Nick Pantev |{" "}
          <a
            href="https://github.com/IYI-Pantev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-info text-decoration-none"
          >
            GitHub
          </a>
        </footer>
      </div>
    </>
  );
}

export default App;
