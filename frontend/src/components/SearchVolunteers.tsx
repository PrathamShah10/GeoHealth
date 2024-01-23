import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_VOLUNTEERS } from "../redux/query/user";
import { findNearestState } from "../utils/CalculateDistance";
import { Languages } from "../common/constants";
const SearchVolunteers = () => {
  const [nearestState, setNearestState] = useState<string | null>(null);
  const [getVolunteers, { data }] = useLazyQuery(GET_ALL_VOLUNTEERS);
  const [volunteers, setVolunteers] = useState<any>();
  const [filteredVolunteers, setFilteredVolunteers] = useState<any>();
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const nearest = findNearestState({ latitude, longitude });
          setNearestState(nearest);
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);
  useEffect(() => {
    if (nearestState) {
      getVolunteers({
        variables: {
          community: nearestState,
        },
      });
    }
    setTimeout(() => {
      setVolunteers(data?.getAllVolunteers);
      setFilteredVolunteers(data?.getAllVolunteers);
    }, 500);
  }, [nearestState, getVolunteers, data?.getAllVolunteers]);
  const handleFilter = (e: any) => {
    const s = e.target.value;
    if (s === "All") {
      setFilteredVolunteers(volunteers);
    } else {
      setFilteredVolunteers(
        volunteers.filter((item: any) => item.languages.includes(s))
      );
    }
  };
  return (
    <div className="mmpage">
      <div className="mainpage w-screen font-Rubik min-h-screen backdrop-blur-md p-1">
        <div className="w-9/12 bg-white ml-auto mr-10 relative rounded-md min-h-[30rem] shadow-md mt-28 h-auto p-5">
          <h1 className="text-3xl font-extrabold text-gray-600">Volunteers</h1>
          <p className="p-2">Filter <select className=" border-2 rounded-md " onChange={handleFilter}>
            <option value="All" key={100}>
              All
            </option>
            {Languages.map((l: string, i: number) => {
              return (
                <option value={l} key={i}>
                  {l}
                </option>
              );
            })}
          </select></p>
          
          <div>
            {filteredVolunteers?.map((v: any, i: any) => {
              return (
                <div
                  key={i}
                  className="mb-4 mt-4 p-4 bg-gray-100 mx-10 rounded-lg shadow-md"
                >
                  <div className="text-xl font-semibold mb-2">Name - {v.name}</div>
                  <div className="text-gray-600 mb-2">Contact : {v.contact}</div>
                  <div className="flex">
                    <div className="text-gray-600 mr-2 mt-1">Languages:</div>
                    <div className="flex flex-wrap">
                      {v?.languages.map((l: string, i: number) => (
                        <div
                          key={i}
                          className="bg-teal-300 text-white rounded  p-1 ml-2"
                        >
                          {l}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchVolunteers;
