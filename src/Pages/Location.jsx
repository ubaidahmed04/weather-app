import React from "react";
import App from "./../App";
import MenuBar from "../Components/Menu";
import { TextField } from "@mui/material";
import { Input, Space } from "antd";
import img from "../Images/sun.png";
const { Search } = Input;
// import { faTemperatureHalf } from '@fortawesome/react-fontawesome'
import "../Components/Style.css";
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

function Location() {
  return (
    <>
      {/* <div className="flex container  main bg-slate-500 ">
        <div>
          <MenuBar />
        </div>

        <div className="flex ">
          <Search placeholder="input search text" 
          style={{
            width: 600,
            color:"#202B3B",
            border:"grey"
          }}
          size="large"
          allowClear
          enterButton />
        </div>
        <div className="flex">
          <div className="bg-slate-300">
          <div>
          <span>Pakistan</span>
          <span>chance of rain : 0% </span>
          </div>
          <div>
          <span>31&deg; </span>
          </div>
          </div>
          <div  className="bg-red-950">
          </div>
        </div>
      </div> */}
      <div className="main">
        <span>
          <Search
            placeholder="input search text"
            style={{
              width: 600,
              color: "#202B3B",
              border: "grey",
              margin: "20px",
            }}
            size="large"
            allowClear
            enterButton
          />
        </span>
        <div className=" flex " style={{ color: "#C4C9D2" }}>
          <div className="temp ">
            <div className="flex flex-row lg:m-20 m-5  items-center  justify-between">
              <div className="flex flex-col ">
                <div>
                  <span className="text-[32px] font-black font-sans text-2xl text-white">
                    Karachi
                  </span>
                </div>
                <div className="mt-9">
                  <span className="text-white font-black text-[25px]">
                    31 &deg;
                  </span>
                </div>
              </div>
              <div>
                <img src={img} className="w-20 " alt="" />
              </div>
            </div>
            <div
              className="m-3 p-3"
              style={{
                background: "#202B3B",
                borderRadius: "10px",
                margin: "7",
              }}
            >
              <span className="">TODAYS FORECAST </span>
              <div className="flex flex-shrink">
                <div
                  style={{ background: "#202B3B", borderBlockColor: "#202B3B" }}
                  className=" border-r-2  m-4"
                >
                  <span>6:00 AM</span>
                  <span>
                    <img src={img} className="img-icon" alt="" />
                  </span>
                  <span className="font-bold">20 &deg;</span>
                </div>
                <div
                  style={{ background: "#202B3B", borderBlockColor: "#202B3B" }}
                  className=" border-r-2  m-4"
                >
                  <span>6:00 AM</span>
                  <span>
                    <img src={img} className="img-icon" alt="" />
                  </span>
                  <span className="font-bold">20 &deg;</span>
                </div>
                <div
                  style={{ background: "#202B3B", borderBlockColor: "#202B3B" }}
                  className=" border-r-2  m-4"
                >
                  <span>6:00 AM</span>
                  <span>
                    <img src={img} className="img-icon" alt="" />
                  </span>
                  <span className="font-bold">20 &deg;</span>
                </div>
                <div
                  style={{ background: "#202B3B", borderBlockColor: "#202B3B" }}
                  className=" border-r-2  m-4"
                >
                  <span>6:00 AM</span>
                  <span>
                    <img src={img} className="img-icon" alt="" />
                  </span>
                  <span className="font-bold">20 &deg;</span>
                </div>
                <div
                  style={{ background: "#202B3B", borderBlockColor: "#202B3B" }}
                  className=" border-r-2  m-4"
                >
                  <span>6:00 AM</span>
                  <span>
                    <img src={img} className="img-icon" alt="" />
                  </span>
                  <span className="font-bold">20 &deg;</span>
                </div>
                <div
                  style={{ background: "#202B3B", borderBlockColor: "#202B3B" }}
                  className=" border-r-2  m-4"
                >
                  <span>6:00 AM</span>
                  <span>
                    <img src={img} className="img-icon" alt="" />
                  </span>
                  <span className="font-bold">20 &deg;</span>
                </div>
              </div>
            </div>
            <div className="m-3 p-3 rounded-lg"
                  style={{ background: "#202B3B" }}
            
            >
              <div className=""> 
                <span className="font-bold">AIR CONDITIONS</span>
                <div className="flex flex-row justify-around">
                  <div className="flex flex-col">
                    <span><i class="fa-solid fa-temperature-half"></i> <span className="text-md">Real Feel</span></span>
                    <span className="font-bold text-2xl">20 &deg;</span>
                    
                    <span><i class="fa-solid fa-droplet"></i> <span>Chance of rain</span></span>
                    
                    <span className="font-bold text-2xl">20%</span>

                  </div>
                  <div>
                    <div>
                      <div className="flex flex-col">
                        <span> <i class="fa-solid fa-wind"></i> <span>wind</span></span>
                        
                        <span className="font-bold text-2xl">0.2 km/h</span>

                        <span><i class="fa-solid fa-gear"></i> <span>UV Index</span></span>
                        
                        <span className="font-bold text-2xl">3</span>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fore-cast bg-slate-800">
            <span
              style={{ color: "#C4C9D2" }}
              className="p-9 text-[19] font-medium text-base"
            >
              {" "}
              7 days forecast
            </span>
            <div className="flex today">
              <span>Today</span>
              <span>
                <img src={img} className="img-icon" alt="" />
              </span>
              <span>Sunny</span>
              <span>35/21</span>
            </div>
            <div className="flex today">
              <span>Today</span>
              <span>
                <img src={img} className="img-icon" alt="" />
              </span>
              <span>Sunny</span>
              <span>35/21</span>
            </div>
            <div className="flex today">
              <span>Today</span>
              <span>
                <img src={img} className="img-icon" alt="" />
              </span>
              <span>Sunny</span>
              <span>35/22</span>
            </div>
            <div className="flex today">
              <span>Today</span>
              <span>
                <img src={img} className="img-icon" alt="" />
              </span>
              <span>Sunny</span>
              <span>35/23</span>
            </div>
            <div className="flex today">
              <span>Today</span>
              <span>
                <img src={img} className="img-icon" alt="" />
              </span>
              <span>Sunny</span>
              <span>35/24</span>
            </div>
            <div className="flex today">
              <span>Today</span>
              <span>
                <img src={img} className="img-icon" alt="" />
              </span>
              <span>Sunny</span>
              <span>35/25</span>
            </div>
            <div className="flex today">
              <span>Today</span>
              <span>
                <img src={img} className="img-icon" alt="" />
              </span>
              <span>Sunny</span>
              <span>35/25</span>
            </div>
            <div className="flex today">
              <span>Today</span>
              <span>
                <img src={img} className="img-icon" alt="" />
              </span>
              <span>Sunny</span>
              <span>35/26</span>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Location;
