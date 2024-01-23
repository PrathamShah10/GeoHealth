import React, { useState, useEffect } from "react";
import { indianStates } from "./constants";
import Select from "react-select";
import { IDropdown } from "../interface/user";
const stateOptions: IDropdown[] = indianStates.map((state) => ({
  label: state,
  value: state,
}));
const Dropdown = ({ title, setVal }: DropdownProps) => {
  const [selectedState, setSelectedState] = useState<IDropdown | null>(null);
  const handleStateChange = (selectedOption: IDropdown | null) => {
    setSelectedState(selectedOption);
  };

  useEffect(() => {
    setVal(selectedState);
  }, [selectedState, setVal]);

  return (
    <div className="">
      <h1 className="font-bold text-4xl text-sea-green-600">{title}</h1>
      <p className="font-bold mt-6 text-xl text-gray-600">Select State</p>
      <Select
        options={stateOptions}
        value={selectedState}
        onChange={handleStateChange}
        isSearchable
        placeholder="Select a state"
      />
      {selectedState && (
        <div>
          <p className="text-xl font-bold mt-5">
            {title} in{" "}
            <span className="text-sea-green-500">{selectedState.label}</span>
          </p>
        </div>
      )}
    </div>
  );
};
type DropdownProps = {
  title: string;
  setVal: any;
};
export default Dropdown;
