import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_VOLUNTEER } from "../redux/query/user";
import { Languages, stateCoordinates } from "../common/constants";
import ClipSpinner from "../common/ClipSpinner";
import { useAppSelector } from "../hooks/redux";

function VolunteerRegister() {
  const { user } = useAppSelector((state) => state.user);
  const [signUpUser, { loading }] = useMutation(ADD_VOLUNTEER);
  const [selectedLanguages, setSelectedLanguages] = useState<Array<string>>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const navigate = useNavigate();
  const handleLanguageChange = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    user?._id &&
      signUpUser({
        variables: {
          volunteerDetails: {
            _id: user?._id,
            languages: selectedLanguages,
            community: selectedCommunity,
            contact,
            desc
          },
        },
      });
    navigate("/newspage");
  };

  return (
    <div className="mainsigninpage min-h-screen flex items-center justify-center">
      <div
        className="signinform ml-10
      w-4/6 p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl text-center font-semibold mb-6">
          Volunteer Registration
        </h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Languages known
            </label>
            {Languages.map((language) => (
              <div key={language} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={language}
                  value={language}
                  checked={selectedLanguages.includes(language)}
                  onChange={() => handleLanguageChange(language)}
                  className="mr-2"
                />
                <label htmlFor={language}>{language}</label>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Region of service
            </label>
            <select
              className="w-full px-3 py-2 border rounded"
              onChange={(e) => setSelectedCommunity(e.target.value)}
              value={selectedCommunity}
            >
              <option value="" disabled>
                Select a Region
              </option>
              {stateCoordinates.map((community, i) => (
                <option key={i} value={community.state}>
                  {community.state}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-800">
              Contact number
            </label>
            <input
              type="string"
              name="contact"
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your number"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-800">
              What help can you provide?
            </label>
            <input
              type="text"
              name="desc"
              onChange={(e) => setDesc(e.target.value)}
              className="w-full h-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder=""
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sea-green-600 text-white py-2 px-4 rounded-md hover:bg-olive-700 focus:outline-none focus:bg-"
          >
            {!loading ? "Register" : <ClipSpinner isLoading={loading} />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VolunteerRegister;
