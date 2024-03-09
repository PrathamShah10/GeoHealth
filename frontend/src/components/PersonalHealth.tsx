import React, { useState, useEffect } from "react";
import { DiseasesData, secondDD, thirdDD } from "../common/constants";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setUserDiseasesAction } from "../redux/action/user";
import VNavbar from "./VNavbar";
import axios from "axios";

// Store data in localStorage
localStorage.setItem("myData", JSON.stringify({ key: "value" }));

const PersonalHealth = ({ data, setData, type }: IPersonalHealth) => {
  const [useConstant, setUseConstant] = useState(undefined);
  useEffect(() => {
    if (type === "2") {
      setUseConstant(secondDD);
    } else if (type === "3") {
      setUseConstant(thirdDD);
    } else {
      setUseConstant(DiseasesData);
    }
  }, [type]);
  useEffect(() => {
    const storedData = localStorage.getItem("myData");
    console.log(storedData);
    if (storedData) {
      // Send data to the Python backend and receive a response
      axios
        .post("/api/send-receive-data", {
          data: JSON.parse(storedData),
        })
        .then((response) => {
          console.log("Response from Python backend:", response.data);
          // You can perform actions with the response here if needed
        })
        .catch((error) => {
          console.error("Error sending/receiving data:", error);
        });
    }
  }, []);
  const { user, diseases } = useAppSelector((state) => state.user);
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>(
    setData ? [] : (diseases || [])
  );
  const dispatch = useAppDispatch();
  const handleAddDisease = () => {
    if (user?._id && setData)
      dispatch(
        setUserDiseasesAction({ _id: user._id, diseases: selectedDiseases })
      );

    if (data) {
      setData(selectedDiseases);
    }
  };
  return (
    <>
      <div className="">
        {!data && <VNavbar />}
        <div className=" ">
          <div className="bg-white flex justify-between mx-auto h-40 rounded shadow-md ">
            {!data && (
              <div>
                <h1 className="font-semibold p-4 text-2xl">
                  Personal Health Records
                </h1>

                <p className="font-normal pl-4 text-xl">
                  Enter and update your health records to help us provide latest
                  information on diseases.
                </p>
              </div>
            )}
            {/* <img className="p-4 pr-10" src="./body-scan.png" alt="" /> */}
          </div>
          <div className="w-1/2 h-[30rem] mx-auto mt-8 p-4 bg-gray-100 rounded shadow">
            {/* <h2 className="text-xl font-semibold mb-4"> */}
            List of {type || "diseases"}
            {/* </h2> */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Select {type || "diseases"}
              </label>
              <Select
                className="w-1/2"
                isMulti
                options={useConstant?.map((disease) => ({
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
                Add {type || "diseases"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
interface IPersonalHealth {
  data?: any;
  setData?: any;
  type?: string;
}
export default PersonalHealth;
