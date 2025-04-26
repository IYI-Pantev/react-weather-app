import { useState, useEffect } from "react";

interface Props {
  city: string;
}

interface ForecastItem {
  dt_txt: string;
  main: { temp: number };
  weather: { description: string }[];
}

interface DailyForecast {
  morning?: ForecastItem;
  noon?: ForecastItem;
  evening?: ForecastItem;
  minTemp: number;
  maxTemp: number;
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const Forecast = ({ city }: Props) => {
  const [dailyForecast, setDailyForecast] = useState<
    Record<string, DailyForecast>
  >({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city || city.toLowerCase() === "telerik") return;

    const getForecastInfo = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        const list: ForecastItem[] = result.list;

        const grouped: Record<string, DailyForecast> = {};

        list.forEach((item) => {
          const [date, time] = item.dt_txt.split(" ");

          if (!grouped[date]) {
            grouped[date] = {
              minTemp: item.main.temp,
              maxTemp: item.main.temp,
            };
          } else {
            grouped[date].minTemp = Math.min(
              grouped[date].minTemp,
              item.main.temp
            );
            grouped[date].maxTemp = Math.max(
              grouped[date].maxTemp,
              item.main.temp
            );
          }

          if (time.startsWith("09:00:00")) {
            grouped[date].morning = item;
          } else if (time.startsWith("12:00:00")) {
            grouped[date].noon = item;
          } else if (time.startsWith("18:00:00")) {
            grouped[date].evening = item;
          }
        });

        setDailyForecast(grouped);
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error");
        }
      }
    };

    getForecastInfo();
  }, [city]);

  return (
    <div className="container mt-5">
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <>
          <h3 className="text-center mb-4">5-Day Forecast</h3>

          <div className="row">
            {Object.entries(dailyForecast).map(([date, data], index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-center mb-3">{date}</h5>

                    <div className="d-flex justify-content-between mb-2">
                      <strong>Morning:</strong>
                      <span>
                        {data.morning
                          ? `${data.morning.main.temp.toFixed(1)}°C, ${
                              data.morning.weather[0].description
                            }`
                          : "-"}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <strong>Noon:</strong>
                      <span>
                        {data.noon
                          ? `${data.noon.main.temp.toFixed(1)}°C, ${
                              data.noon.weather[0].description
                            }`
                          : "-"}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <strong>Evening:</strong>
                      <span>
                        {data.evening
                          ? `${data.evening.main.temp.toFixed(1)}°C, ${
                              data.evening.weather[0].description
                            }`
                          : "-"}
                      </span>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between">
                      <span className="text-success">
                        Min: {data.minTemp.toFixed(1)}°C
                      </span>
                      <span className="text-danger">
                        Max: {data.maxTemp.toFixed(1)}°C
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Forecast;
