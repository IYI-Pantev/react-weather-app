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
      <div
        className="min-vh-100 d-flex flex-column"
        style={{
          backgroundImage: 'url("/src/pictures/mountain-sky.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Header stays clean at top */}
        <Header />

        {/* Dim overlay */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent black
            flex: 1,
            paddingTop: "2rem",
            paddingBottom: "2rem",
          }}
        >
          {/* Content */}
          <div className="container py-5 text-center text-light">
            <h2 className="mb-3">Welcome to the Weather App</h2>
            <p className="text-muted text-light">
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
                style={{
                  borderColor: "#0d6efd",
                  outline: "none",
                  backgroundColor: "rgba(255, 255, 255, 0.9)", // slightly see-through input
                }}
              />
              <button
                className="btn btn-primary d-flex align-items-center"
                onClick={handleSearch}
              >
                Search&nbsp;🔎
              </button>
            </div>

            {/* Show weather card and forecast after search */}
            {searchedCity && (
              <>
                <WeatherCard city={searchedCity} />
                <Forecast city={searchedCity} />
              </>
            )}
          </div>
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
