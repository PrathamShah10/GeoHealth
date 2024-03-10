import React, { useState } from "react";
import PersonalHealth from "./PersonalHealth";
const MLmodel = () => {
  const [disData, setDisData] = useState<Array<string>>([]);
  const [recommendation, setRecommendation] = useState<any>([]);
  const [showrem, setShowrem] = useState(false);
  const handleSubmit = async () => {
    setShowrem(true)
    try {
      console.log("m sending", disData);
      const response = await fetch("http://localhost:7000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: disData }),
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }
      const responseBody = await response.text();
      const jsonData = JSON.parse(responseBody);
      console.log("Response body:", jsonData.data);
      setRecommendation(jsonData.data);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error posting data:", err.message);
      }
    }
  };
  return (
    <div className="ml-[20rem] mt-20 p-10">
      <h1 className="text-3xl font-semibold font-Rubik text-gray-600">
        Diet Recommender
      </h1>
      <div className="mt-4   w-5/6 rounded-lg">
        <div className="">
          <PersonalHealth data={disData} setData={setDisData} type={"1"} />
          {/* <PostDisease /> */}
          <button
            className="items-center justify-center p-3 rounded-md text-white  bg-teal-400 mt-2"
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
      </div>
      {showrem && (
        <>
          <div className="shadow-lg p-5 mt-5">
            <h1 className="text-2xl font-semibold text-gray-600">
              Diet Recommendation for you
            </h1>
            {recommendation?.map((r, i) => {
              return (
                <div className="mt-4 font-Rubik " key={i}>
                  <div className="text-xl font-Rubik ">{r.name}</div>
                  <div className="mt-1 font-Rubik ">{r.description}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default MLmodel;
