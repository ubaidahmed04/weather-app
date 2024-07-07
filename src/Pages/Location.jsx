import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Button, Input, Space, Spin, Empty } from "antd";
import img from "../Images/sun.png";
import NoData from "../Images/not-found.png";
import NotFound from "../Images/not-found (1).png";
import "../Components/Style.css";

const { Search } = Input;

function Location() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherCast, setforeCast] = useState([]);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const API_KEY = `de7bf3dd53bd737f80a064ec0b825fb3`;

  const onBtnCall = () => {
    getWeather(location);
  };

  const getWeather = async (location) => {
    let url;
    let foreCastURL;
    if (location) {
      url = `https://api.openweathermap.org/data/2.5/weather?&q=${location}&appid=${API_KEY}&units=metric`;
      foreCastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`;
    } else {
      try {
        const position = await getCurrentPosition();
        console.log(position)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
        foreCastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      } catch (err) {
        console.log(err);
        setLocationPermissionDenied(true);
        setLoading(false);
        return;
      }
    }
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLocation("");
      setLoading(false);
      const fetchForecast = await fetch(foreCastURL);
      const resForecast = await fetchForecast.json();
      setforeCast(resForecast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  let iconImg = data?.weather?.[0]?.icon;

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getWeather(location);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <>
      <div className="main  ">
        <span className="flex lg:w-[54rem] md:w-[44rem] xsm:ml-0 ml-5 mt-2 font-bold">
          <TextField
            id="filled-search"
            label="Enter your Location"
            type="search"
            variant="filled"
            value={location}
            onKeyPress={handleKeyPress}
            onChange={(e) => setLocation(e.target.value)}
            InputLabelProps={{
              style: { fontSize: "1.2rem" },
            }}
            InputProps={{
              style: {
                backgroundColor: "#FFFFFF",
                borderTopLeftRadius: 7,
                borderBottomLeftRadius: 7,
              },
            }}
            inputProps={{
              style: {
                fontSize: "1.0rem", // Adjust the font size for the input text
                color: "#202B3B",
              },
            }}
            sx={{
              flexGrow: 0.5,
            }}
          />
          <span
            style={{
              background: "#FFFFFF",
              width: "50px",
              height: "55px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: "0 4px 4px 0",
              color: "#202B3B",
            }}
            onClick={onBtnCall}
            className="w-45"
          >
            <i className=" fa-solid fa-2x fa-magnifying-glass"></i>
          </span>
        </span>
        {loading ? (
          <div className="items-center flex justify-center mt-[17rem]">
            <div>
              <Spin size="large" />
            </div>
          </div>
        ) : locationPermissionDenied ? (
          <div className="flex flex-col not-found text-slate-500 lg:mt-7 rounded-lg lg:h-[27rem] lg:w-4/5 md:h-[20rem] sm:h-[20rem] xsm:h-[15rem] lg:mx-[4rem] md:mx-[3rem] sm:mx-[3rem] mt-9 overflow-hidden">
            <div className="lg:w-[19rem] xl:w-[18rem] xsm:w-[9rem] sm:w-[6rem] ">
              <img src={NotFound} alt="location permission denied" />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-extrabold lg:text-[1.4rem] text-50 sm:mt-7 sm:text-center">
                Please enable location services or enter your location manually.
              </span>
              <br />
              <Button
                onClick={handleRefresh}
                className="text-slate-200 flex bg-slate-500 object-fit"
                type="primary"
              >
                Refresh
              </Button>
            </div>
          </div>
        ) : data === undefined || data === null || data.cod === "404" ? (
          <div className="flex flex-col not-found text-slate-500 lg:mt-7 rounded-lg lg:h-[27rem] lg:w-4/5 md:h-[20rem] sm:h-[20rem] xsm:h-[15rem] lg:mx-[4rem] md:mx-[3rem] sm:mx-[3rem] mt-9 overflow-hidden">
            <div className="lg:w-[19rem] xl:w-[18rem] xsm:w-[9rem] sm:w-[6rem] ">
              <img src={NotFound} alt="data not found" />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-extrabold lg:text-[1.4rem] text-50 sm:mt-7 sm:text-center">
                Sorry, we couldn't find the data for the specified city or
                Country.
              </span>
              <br />
              <Button
                onClick={handleRefresh}
                className="text-slate-200 flex bg-slate-500 object-fit"
                type="primary"
              >
                Go Back
              </Button>
            </div>
          </div>
        ) : data && data.name ? (
          <div className="flex flex-wrap" style={{ color: "#C4C9D2" }}>
            <div className="temp md:grow sm:grow">
              <div className="flex flex-row m-5 lg-m-9 items-center justify-between">
                <div className="flex flex-col">
                  <div>
                    <span className="text-[39px] font-black font-sans text-2xl text-white">
                      {data.name}
                    </span>
                  </div>
                  <span>
                    Chance of rain {data.clouds && `${data.clouds.all}%`}
                  </span>
                  <div className="mt-5">
                    <span className="text-white font-black text-[34px]">
                      {data.main && `${Math.floor(data.main.temp)}°`}
                    </span>
                  </div>
                </div>
                <div>
                  <img
                    style={{ width: "155px" }}
                    src={`https://openweathermap.org/img/wn/${iconImg}.png`}
                    className="img-main"
                    alt="cloud Image"
                  />
                </div>
              </div>
              <div
                className="m-3 p-3"
                style={{ background: "#202B3B", borderRadius: "10px" }}
              >
                <span
                  className="font-semibold text-sm md:text-center"
                  style={{ color: "#C4C9D2" }}
                >
                  TODAYS FORECAST
                </span>
                <div className="flex shrink justify-center items-center flex-wrap">
                  {weatherCast.list &&
                    weatherCast.list.slice(0, 6).map((forecast, index) => (
                      <div
                        key={index}
                        style={{
                          background: "#202B3B",
                          borderBlockColor: "#202B3B",
                        }}
                        className="border-r border-r-gray-700 p-3 mr-1 text-center pb-3 m-2"
                      >
                        <span
                          style={{
                            color: "#C4C9D2",
                            fontSize: "13px",
                            fontWeight: "bold",
                          }}
                        >
                          {new Date(forecast.dt * 1000).toLocaleTimeString()}
                        </span>
                        <span>
                          <img
                            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                            className="img-icon"
                            alt="cloud icon "
                          />
                        </span>
                        <span className="font-extrabold text-lg">
                          {Math.floor(forecast.main.temp)}&deg;
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              <div
                className="m-3 p-3 rounded-lg"
                style={{ background: "#202B3B" }}
              >
                <div>
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "#C4C9D2" }}
                  >
                    AIR CONDITIONS
                  </span>
                  <div className="flex flex-row justify-around">
                    <div className="flex flex-col">
                      <span>
                        <i className="fa-solid fa-temperature-half"></i>{" "}
                        <span className="text-md">Real Feel</span>
                      </span>
                      <span className="font-bold text-2xl">
                        {data.main && `${data.main.feels_like}°`}
                      </span>
                      <span>
                        <i className="fa-solid fa-droplet"></i>{" "}
                        <span>Chance of rain</span>
                      </span>
                      <span className="font-bold text-2xl">
                        {data.clouds && `${data.clouds.all}%`}
                      </span>
                    </div>
                    <div>
                      <div className="flex flex-col">
                        <span>
                          <i className="fa-solid fa-wind"></i> <span>wind</span>
                        </span>
                        <span className="font-bold text-2xl">
                          {data.wind && `${data.wind.speed} km/h`}
                        </span>
                        <span>
                          <i className="fa-solid fa-water"></i>
                          <span> Humidity</span>
                        </span>
                        <span className="font-bold text-2xl">
                          {data?.main?.humidity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {weatherCast && weatherCast.list && (
              <div className="fore-cast md:grow sm:grow">
                <span
                  style={{ color: "#C4C9D2" }}
                  className="p-9 text-[19] font-medium sm:text-base lg:text-lg lg:mt-10"
                >
                  7 days forecast
                </span>
                {Object.values(
                  weatherCast.list.reduce((uniqueForecasts, forecast) => {
                    const date = forecast.dt_txt.split(" ")[0];
                    if (!uniqueForecasts[date]) {
                      uniqueForecasts[date] = forecast;
                    }
                    return uniqueForecasts;
                  }, {})
                ).map((forecast, index) => (
                  <div
                    key={index}
                    className="flex today border-b border-b-gray-700 pb-2"
                  >
                    <span className="text-sm">
                      {forecast.dt_txt.split(" ")[0]}
                    </span>
                    <span>
                      <img
                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                        className="img-icon"
                        alt=""
                      />
                    </span>
                    <span className="text-base font-medium">
                      {forecast.weather[0].main}
                    </span>
                    <span>
                      <b>
                        {Math.floor(forecast.main.temp_max)}/
                        {Math.floor(forecast.main.temp_min)}
                      </b>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Location;
