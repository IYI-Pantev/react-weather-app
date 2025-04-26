import { useState } from "react";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";

function App() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const handleSearch = () => {
    setSearchedCity(city);
  };

  return (
    <>
      <div className="min-vh-100 bg-light">
        <Header />
        <div className="container py-5 text-center">
          <h2 className="mb-3">Welcome to the Weather App</h2>
          <p className="text-muted">
            Start by entering a city to get the current weather.
          </p>
          <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
            <input
              type="text"
              name="city"
              id="text-field"
              placeholder="Enter location..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-control"
              style={{
                maxWidth: "300px",
                borderColor: "#0d6efd",
                color: "#0d47a1",
                boxShadow: "0 0 0 0.15rem rgba(13, 110, 253, 0.25)",
              }}
            />
            <button
              onClick={handleSearch}
              className="btn btn-primary d-flex align-items-center gap-2"
            >
              Search
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 
      1.415-1.414l-3.85-3.85zm-5.242 1.156a5 5 0 1 1 
      0-10 5 5 0 0 1 0 10z"
                />
              </svg>
            </button>
          </div>
        </div>
        <WeatherCard city={searchedCity} />
        <Forecast city={searchedCity} />
      </div>
    </>
  );
}

export default App;
