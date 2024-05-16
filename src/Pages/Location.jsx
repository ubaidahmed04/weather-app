import React from "react";
import App from "./../App";
import MenuBar from "../Components/Menu";
import { TextField } from "@mui/material";
import { Input, Space } from "antd";
const { Search } = Input;
import  '../Components/Style.css';

function Location() {
  return (
    <>
      <div className="flex container  main bg-slate-500 ">
        <div>
          <MenuBar />
        </div>

        <div className="flex ">
          {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
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
      </div>
    </>
  );
}

export default Location;
