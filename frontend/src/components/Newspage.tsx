import React, { useState } from "react";
import { indianStates } from "../common/constants";
import { Link } from "react-router-dom";
import Select from "react-select";

interface State {
    label: string;
    value: string;
}
const Newspage = () => {
    const [selectedState, setSelectedState] = useState<State | null>(null);

    const stateOptions: State[] = indianStates.map((state) => ({
        label: state,
        value: state,
    }));

    const handleStateChange = (selectedOption: State | null) => {
        setSelectedState(selectedOption);
    };
    return (<>
        <div className="w-screen flex justify-center ">
            <div className="w-3/4 mt-20 p-10 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <div className="">
                    <h1 className="font-bold text-4xl text-sea-green-600">News</h1>
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
                            <p className="text-xl font-bold mt-5">News in <span className="text-sea-green-500">{selectedState.label}</span></p>
                        </div>
                    )}
                </div>
                <Link to={`/news/${selectedState?.label}`}>
                    <button className="bg-sea-green-500 text-white p-2 font-semibold rounded-full mt-3">View News</button>
                </Link>

            </div>
        </div> </>)
};

export default Newspage;