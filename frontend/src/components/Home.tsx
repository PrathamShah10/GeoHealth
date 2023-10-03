import React, { useState } from "react";
import { indianStates } from "../common/constants";
import { Link } from "react-router-dom";
import Select from "react-select";

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
  return (
    <div>
      hello this is home
      <Link to="/health-data">
        <button className="bg-black text-white p-4 rounded-lg">
          Enter Health Data
        </button>
      </Link>
      <div>
        <label>Select State:</label>
        <Select
          options={stateOptions}
          value={selectedState}
          onChange={handleStateChange}
          isSearchable
          placeholder="Select a state"
        />
        {selectedState && (
          <div>
            <p>Selected State: {selectedState.label}</p>
          </div>
        )}
      </div>
      <Link to={`/news/${selectedState?.label}`}>
        <button>View News</button>
      </Link>
    </div>
  );
};

export default Home;
