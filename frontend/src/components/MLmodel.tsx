import React, { useState } from "react";
import PersonalHealth from "./PersonalHealth";
const MLmodel = () => {
  const [disData, setDisData] = useState<Array<string>>([]);
  const [recommendation, setRecommendation] = useState<any>([]);
  const handleSubmit = async () => {
    try {
      console.log("m sending", disData);
      const response = await fetch("http://localhost:5000/data", {
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
    <div className="h-screen flex items-center justify-center">
      ML Model
      <PersonalHealth data={disData} setData={setDisData} type={"1"} />
      {/* <PostDisease /> */}
      <button
        className="flex items-center justify-center p-10 bg-green-200"
        onClick={handleSubmit}
      >
        submit
      </button>
      bhai intake ye hai dekhle
      {recommendation?.map((r, i) => {
        return (
          <div key={i}>
            <div>{r.name}</div>
            <div>{r.description}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MLmodel;
