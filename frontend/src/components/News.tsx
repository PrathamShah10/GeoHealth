import React, { useState, useEffect } from "react";
import { API_KEY } from '../variables'
import axios from "axios";
import { useParams } from "react-router";
import VNavbar from "./VNavbar";
// import { indianStates } from "../common/constants";
// import { Link } from "react-router-dom";
// import Select from "react-select";

// interface State {
//   label: string;
//   value: string;
// }
const News = () => {
  const [newsArticles, setNewsArticles] = useState<any[] | null>(null);
  const { state } = useParams();
  // const [selectedState, setSelectedState] = useState<State | null>(null);

  // const stateOptions: State[] = indianStates.map((state) => ({
  //   label: state,
  //   value: state,
  // }));

  // const handleStateChange = (selectedOption: State | null) => {
  //   setSelectedState(selectedOption);
  // };
  useEffect(() => {
    const getNews = async () => {
      const API_ENDPOINT = `https://newsdata.io/api/1/news?apikey=${API_KEY}&category=health&q=${state}&language=en`;
      const res = await axios.get(API_ENDPOINT);
      setNewsArticles(res.data.results);
    };
    getNews();
  }, [state]);

  return (<>
  <div className="flex" >
    <VNavbar/>
    <div className="w-screen justify-center">
      {/* <div className="w-3/4 mt-20 p-10 ml-auto mr-auto rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
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

      </div> */}
      <div className=" ml-[50px] px-4 h-screen py-8 overflow-scroll overflow-x-hidden">
        <h1 className="text-green-600 text-2xl font-bold mb-4">
          Medical News headlines
        </h1>
        {newsArticles?.map((ele: any, i: number) => (
          <div key={i} className="border-b py-4 ">
            <p className="text-gray-500 mb-1">{ele.author}</p>
            <h2 className="text-xl font-semibold mb-2">{ele.title}</h2>
            <p className="text-gray-800">{ele.description}</p>
            <br />
            <p className="text-gray-800">
              For more info visit:{" "}
              <a href={ele.url}>
                {" "}
                <span className="text-blue-400">here</span>
              </a>
            </p>
          </div>
        ))}
        {!newsArticles && <p className="text-center">Loading...</p>}
      </div>
      </div> </div>
    </> );
};
export default News;
