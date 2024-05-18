import { useEffect, useState } from "react";
import App from "./../App";
import MenuBar from "../Components/Menu";
import { TextField } from "@mui/material";
import { Input, Space } from "antd";
import img from "../Images/sun.png";
const { Search } = Input;
import { Empty, Transfer } from "antd";
import "../Components/Style.css";

function Location() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState("");
  const [weatherCast, setforeCast] = useState([]);
  const API_KEY = `de7bf3dd53bd737f80a064ec0b825fb3`;

  const onBtnCall = () => {
    console.log("first");
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
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
        foreCastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLocation("");
      console.log("Weather Data:", result); // Check the data here
      const fetchForecast = await fetch(foreCastURL);
      const resForecast = await fetchForecast.json();
      setforeCast(resForecast);
      console.log("Forecast Data:", resForecast); // Check the forecast data here
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  let iconImg = data?.weather?.[0]?.icon;

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <>
      <div className="main">
        <span className="flex items-center mt-1 font-bold ml-20  rounded-l-lg">
          <TextField
            id="filled-search"
            label="Enter your Location"
            type="search"
            variant="filled"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            style={{ background: "#FFFFFF", flexGrow: 0.5, color: "#D1D5DB",}}
          />
          <span
            style={{
              background: "#FFFFFF",
              width: "50px",
              height: "56px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor:"pointer"
            }}
            onClick={onBtnCall}
            className="w-45"
          >
            <i className="text-gray-600 fa-solid fa-2x fa-magnifying-glass"></i>
          </span>
        </span>
        {data && data.name ?(
        <div className="flex flex-wrap" style={{ color: "#C4C9D2" }}>
          <div className="temp md:grow sm:grow">
            <div className="flex flex-row m-5 lg-m-9 items-center  justify-between">
              <div className="flex  flex-col ">
                <div>
                  <span className="text-[39px]  font-black font-sans text-2xl text-white">
                    {data.name}
                  </span>
                </div>
                  <span className="">Chance of rain  {data.clouds && `${data.clouds.all}%`}</span>
                <div className="mt-5">
                  <span className="text-white font-black text-[34px]">
                    {data.main && `${Math.floor(data.main.temp)}°`}
                  </span>
                </div>
              </div>
              <div>
                <img
                style={{
                  width:"155px"
                }}
                  src={`https://openweathermap.org/img/wn/${iconImg}.png`}
                  className="img-main"
                  alt="cloud Image"
                />
              </div>
            </div>
            <div
              className="m-3 p-3"
              style={{
                background: "#202B3B",
                borderRadius: "10px",
              }}
            >
              <span
                className="font-semibold text-sm md:text-center"
                style={{ color: "#C4C9D2" }}
              >
                TODAYS FORECAST
              </span>
              <div className="flex shrink justify-center items-center flex-wrap">
                {/* Example forecast data display */}
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
                          src={`https://openweathermap.org/img/wn/${iconImg}.png`}
                          className="img-icon"
                          alt=""
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
                        <i class="fa-solid fa-water"></i>
                        <span> Humidity</span>
                      </span>
                      <span className="font-bold text-2xl">{data?.main?.humidity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fore-cast md:grow sm:grow">
            <span
              style={{ color: "#C4C9D2" }}
              className="p-9 text-[19] font-medium sm:text-base lg:text-lg lg:mt-10"
            >
              7 days forecast
            </span>
            {weatherCast.list &&
              weatherCast.list.slice(0, 7).map((forecast, index) => (
                <div
                  key={index}
                  className="flex today border-b border-b-gray-700 pb-2"
                >
                  <span className="text-sm">
                    {new Date(forecast.dt * 1000).toLocaleDateString()}
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
                  <span><b>{`${Math.floor(forecast.main.temp_max)}/${Math.floor(forecast.main.temp_min)}`}</b></span>
                </div>
              ))}
          </div>
        </div>):(
         <div
         className="flex  flex-col justify-center"
         style={{
           background: "#E6F4FF",
           width: "440px",
           height: "500px",
           borderRadius: "20px",
           marginLeft: "190px",
         }}
       >
         <div className="flex items-center flex-col ">
           <Empty  image={Empty.PRESENTED_IMAGE_SIMPLE} />
           <div>
             <span className="font-extrabold  text-50 ">Not found !</span>
             <span className="font-bold bold text-40">
               Please Enter Valid Country or City
             </span>
           </div>
         </div>
       </div>  
        )}
      </div>
    </>
  );
}

export default Location;

{
  /* <div
  className="flex  flex-col justify-center"
  style={{
    background: "#E6F4FF",
    width: "440px",
    height: "500px",
    borderRadius: "20px",
    marginLeft: "190px",
  }}
>
  <div className="flex items-center flex-col ">
    <Empty  image={Empty.PRESENTED_IMAGE_SIMPLE} />
    <div>
      <span className="font-extrabold  text-50 ">Not found !</span>
      <span className="font-bold bold text-40">
        Please Enter Valid Country or City
      </span>
    </div>
  </div>
</div> */
}
