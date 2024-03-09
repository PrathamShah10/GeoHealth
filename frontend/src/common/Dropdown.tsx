import React, { useState, useEffect } from "react";
import { indianStates, DiseasesData } from "./constants";
import Select from "react-select";
import { IDropdown } from "../interface/user";
// const stateOptions: IDropdown[] = indianStates.map((state) => ({
//   label: state,
//   value: state,
// }));
const Dropdown = ({ title, setVal }: DropdownProps) => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedContent, setSelectedContent] = useState<any>([]);
  const handleStateChange = (selectedOption: string | null) => {
    setSelectedState(selectedOption);
  };
  useEffect(() => {
    if(title === 'diseases') {
      setSelectedContent(DiseasesData)
    }
    else if(title === 'veg') {
      setSelectedContent(['veg','non-veg'])
    }
    else if(title === 'nutrients') {
      setSelectedContent(['A','B','C','D'])
    }
    else {
      setSelectedContent(['diet'])
    }

  }, [])
  useEffect(() => {
    setVal(selectedState);
  }, [selectedState, setVal]);

  return (
    <div className="">
      <h1 className="font-bold text-4xl text-sea-green-600">{title}</h1>
      <p className="font-bold mt-6 text-xl text-gray-600">Select State</p>
      <Select
        // options={stateOptions}
        value={selectedState}
        onChange={handleStateChange}
        isSearchable
        placeholder={`Select a ${title}`}
      />
      {selectedState && (
        <div>
          <p className="text-xl font-bold mt-5">
            {title} in{" "}
            <span className="text-sea-green-500">{selectedState}</span>
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
