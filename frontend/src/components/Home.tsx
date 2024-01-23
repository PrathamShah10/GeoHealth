import React, { useState } from "react";
import { indianStates } from "../common/constants";
import { Link } from "react-router-dom";
import Select from "react-select";
import VNavbar from "./VNavbar";
interface State {
  label: string;
  value: string;
}
const Home = () => {
  return (<>
      <VNavbar/>
  </>
    
  );
};

export default Home;