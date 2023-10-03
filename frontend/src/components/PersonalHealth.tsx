import React, { useState } from "react";
import { DiseasesData } from "../common/constants";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setUserDiseasesAction } from "../redux/action/user";

const PersonalHealth: React.FC = () => {
  const { diseases } = useAppSelector((state) => state.user);
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>(
    diseases || []
  );
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleAddDisease = () => {
    if (user?._id)
      dispatch(
        setUserDiseasesAction({ _id: user._id, diseases: selectedDiseases })
      );
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Disease Input Form</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Select Disease
        </label>
        <Select
          isMulti
          options={DiseasesData.map((disease) => ({
            value: disease,
            label: disease,
          }))}
          value={selectedDiseases?.map((disease) => ({
            value: disease,
            label: disease,
          }))}
          onChange={(selectedOptions: any) =>
            setSelectedDiseases(
              selectedOptions.map((option: any) => option.value)
            )
          }
          isSearchable
        />
      </div>
      <div className="mb-4">
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddDisease}
        >
          Add Diseases
        </button>
      </div>
    </div>
  );
};

export default PersonalHealth;
