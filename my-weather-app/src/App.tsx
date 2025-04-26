import { useState } from "react";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";

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
          <input
            type="text"
            name="city"
            id="text-field"
            placeholder="Enter location..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />{" "}
          <button onClick={handleSearch}>Search</button>
        </div>
        <WeatherCard city={searchedCity} />
      </div>
    </>
  );
}

export default App;
