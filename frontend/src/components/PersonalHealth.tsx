import React, { useState , useEffect} from "react";
import { DiseasesData } from "../common/constants";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setUserDiseasesAction } from "../redux/action/user";
import VNavbar from "./VNavbar";
import axios from 'axios';



// Store data in localStorage
localStorage.setItem('myData', JSON.stringify({ key: 'value' }));

const PersonalHealth: React.FC = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const storedData = localStorage.getItem('myData');
    console.log(storedData)
    if (storedData) {
      // Send data to the Python backend and receive a response
      axios.post('/api/send-receive-data', {
          data: JSON.parse(storedData),
        })
        .then((response) => {
          console.log('Response from Python backend:', response.data);
          // You can perform actions with the response here if needed
        })
        .catch((error) => {
          console.error('Error sending/receiving data:', error);
        });
    }
  }, []);
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
    <>
      <div className="flex ">
        
        <div className="w-5/6 px-4 h-20 mx-auto mt-40 ">
          
          <div className="w-1/2 h-[30rem] mx-auto mt-8 p-4 bg-gray-100 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">List of diseases</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Select Disease
              </label>
              <Select className="w-1/2"
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
            <div className="mb-4 mt-auto">
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                onClick={handleAddDisease}
              >
                Add Diseases
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalHealth;
