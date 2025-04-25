import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const WeatherCard = () => {
  const [degreesCelsius, setDegreesCelsius] = useState<number | null>(null);
  const [weatherDesc, setWeatherDesc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const city = "Sofia";

  useEffect(() => {
    const getWeatherInfo = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Fetched result:", result);

        setDegreesCelsius(result.main.temp);
        setWeatherDesc(result.weather[0].description);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error");
        }
      }
    };

    getWeatherInfo();
  }, []);

  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        className="card shadow-sm p-4"
        style={{ width: "22rem", minHeight: "18rem" }}
      >
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <>
            <h2 className="card-title text-center mb-3">{city}</h2>

            {degreesCelsius !== null && (
              <h3 className="text-center text-primary mb-3">
                {degreesCelsius.toFixed(1)}°C
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
