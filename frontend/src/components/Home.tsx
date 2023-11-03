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
  const [selectedState, setSelectedState] = useState<State | null>(null);

  const stateOptions: State[] = indianStates.map((state) => ({
    label: state,
    value: state,
  }));

  const handleStateChange = (selectedOption: State | null) => {
    setSelectedState(selectedOption);
  };
  return (<>
      <VNavbar/>
  </>
    
  );
};

export default Home;
