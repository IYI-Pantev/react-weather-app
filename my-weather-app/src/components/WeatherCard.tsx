import { useState, useEffect } from "react";

interface Props {
  city: string;
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const WeatherCard = ({ city }: Props) => {
  const [tempCelsius, setTempCelsius] = useState<number | null>(null);
  const [weatherDesc, setWeatherDesc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city || city.toLowerCase() === "telerik") return; // don't fetch for empty or Telerik

    const getWeatherInfo = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        // console.log("Fetched result:", result);

        setTempCelsius(result.main.temp);
        setWeatherDesc(result.weather[0].description);
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error");
        }
      }
    };

    getWeatherInfo();
  }, [city]);

  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        className="card shadow p-4"
        style={{ width: "22rem", minHeight: "18rem" }}
      >
        {/* Special funny card for Telerik */}
        {city.toLowerCase() === "telerik" ? (
          <>
            <h2 className="card-title text-center mb-3 text-success">
              👨‍💻 Telerik Academy
            </h2>
            <p className="text-center fs-5 text-muted">
              Time to grind coding, amigo! 🚀🔥
            </p>
            <div className="text-center mt-3">
              <span style={{ fontSize: "3rem" }}>💻☕👨‍💻</span>
            </div>
          </>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <>
            <h2 className="card-title text-center mb-3">{city}</h2>

            {tempCelsius !== null && (
              <h3 className="text-center text-primary mb-3">
                {tempCelsius.toFixed(1)}°C
              </h3>
            )}

            {weatherDesc && (
              <p className="text-center text-muted text-capitalize">
                {weatherDesc}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
