import { useEffect, useState } from "react";
import backgroundImage from "../Images/bgImg.jpg";
import backImage from "../Images/backimg.png";
import umbrella from "../Images/umbrella.png";
import wind from "../Images/icons8-wind-30.png";
import humidity from "../Images/icons8-humidity-50.png";
// import SunImg from "../Images/sunimg-removebg-preview.png";

function Weather() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState("");
  const [weatherCast, setforeCast] = useState([]);
  const API_KEY = `de7bf3dd53bd737f80a064ec0b825fb3`;
  const lat = "24.8607";
  const lon = "67.0011";
  const onBtnCall = () => {
    getWeather(location);
  };
  const getWeather = async (location) => {
    let url;
    let foreCastURL;
    if (location) {
      url = `https://api.openweathermap.org/data/2.5/weather?&q=${location}&appid=${API_KEY}&units=metric`;
      foreCastURL =  `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
    } else {
      try {
        const position = await getCurrentPosition();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
        foreCastURL =`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLocation("");
      console.log(data);
      const fetchForecast = await fetch(foreCastURL);
      const resForecast = await fetchForecast.json();
      setforeCast(resForecast);
      console.log(weatherCast)
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  let iconImg = data?.weather?.[0]?.icon;
  console.log(iconImg)
  // let iconImg = "01n";
    const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  useEffect(() => {
    getWeather();

    // console.log(weatherCast.list[0].dt_txt)
  }, []);

  return (
    <>
      <div
        className="bg-cover w-screen h-screen"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex justify-center items-center flex-col p-[40px]">
          <div className="w-full md:max-w-[500px] flex flex-col h-[550px] object-cover bg-repeat rounded-3xl shadow-slate-600 p-8 sm:min-w-[400px] bg-gradient-to-r from-violet-500 to-fuchsia-500">
            <div className="flex items-center justify-between mb-8">
              <div className="border-black">
                <i className="fa-solid fa-bars fa-xl "></i>
              </div>
              <div>
                <span className="text-3xl font-bold">{data?.name}</span>
              </div>
              <div>
                <i className="fa-solid fa-tree-city fa-xl"></i>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={location}
                className="w-full md:w-full p-3 bg-white h-10 rounded-lg text-xl border border-b-black"
                placeholder="Enter Your Location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <span className="bg-blend-hard-light w-[50px] h-[35px] rounded-lg text-center pt-[5px] cursor-pointer">
                <i
                  className="fa-solid fa-magnifying-glass fa-xl"
                  onClick={onBtnCall}
                ></i>
              </span>
            </div>
            <div className="flex justify-center flex-col items-center">
              <img
                src={`https://openweathermap.org/img/wn$`}
                className="w-[200px] sm:min-w-[170px]"
                alt=""
              />
              <span className="font-bold text-4xl text-white">
                {data?.main?.temp}&deg;C
              </span>
            </div>
            <div className="flex flex-row justify-between text-lg text-black pt-5 ">
              <div className="flex flex-col items-center">
                <span>
                  <img src={umbrella} alt="" className="w-[50px]" />
                </span>
                <span className="font-bold">Prediction</span>
                <span className="font-semibold">30%</span>
              </div>
              <div className="flex flex-col items-center">
                <span>
                  <img src={wind} className="w-[40px] pb-3" alt="" />
                </span>
                <span className="font-bold">Pressure</span>
                <span className="font-semibold">
                  {data?.wind?.speed}/{data?.main?.pressure}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span>
                  <img src={humidity} className="w-[40px] pb-3 " alt="" />
                </span>
                <span className="font-bold">Humidity</span>
                <span className="font-semibold">{data?.main?.humidity}</span>
              </div>
            </div>
            <div className="flex justify-center items-center mt-9 h-20">
              <div>
              <img
                    src={`https://openweathermap.org/img/wn/${iconImg}.png`} // Dynamically construct the URL for the weather icon
                    alt="Weather Icon"
                  />
              
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
