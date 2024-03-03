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
    <div className="p-4 rounded shadow-md">
      <div className="text-2xl font-bold mb-4">Volunteers List</div>
      <select onChange={handleFilter}>
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
      </select>
      <div>
        {filteredVolunteers?.map((v: any, i: any) => {
          return (
            <div
              key={i}
              className="mb-4 p-4 bg-green-200 mx-10 rounded-lg shadow-md"
            >
              <div className="text-xl font-semibold mb-2">{v.name}</div>
              <div className="text-gray-600 mb-2">Contact via: {v.contact}</div>
              <div className="flex">
                <div className="text-gray-600 mr-2">Languages:</div>
                <div className="flex flex-wrap">
                  {v?.languages.map((l: string, i: number) => (
                    <div
                      key={i}
                      className="bg-red-300 text-gray-700 rounded px-2 py-1 m-1"
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
  );
};

export default SearchVolunteers;
