import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <>
      <div className="min-vh-100 bg-light">
        <Header />
        <div className="container py-5 text-center">
          <h2 className="mb-3">Welcome to the Weather App</h2>
          <p className="text-muted">
            Start by entering a city to get the current weather.
          </p>
        </div>

        <WeatherCard />
      </div>
    </>
  );
}

export default App;
