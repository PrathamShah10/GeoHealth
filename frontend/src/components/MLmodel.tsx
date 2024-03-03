import React, { useState } from "react";
import PersonalHealth from "./PersonalHealth";
const MLmodel = () => {
  const [disData, setDisData] = useState<Array<string>>([]);
  const [nutData, setNutData] = useState<Array<string>>([]);
  const [third, setThird] = useState<Array<string>>([]);
  console.log(`${disData} xxx ${nutData} xxx ${third}`);
  return (
    <div>
      ML Model
      <PersonalHealth data={disData} setData={setDisData} type={"1"} />
      <PersonalHealth data={nutData} setData={setNutData} type={"2"} />
      <PersonalHealth data={third} setData={setThird} type={"3"} />
    </div>
  );
};

export default MLmodel;
