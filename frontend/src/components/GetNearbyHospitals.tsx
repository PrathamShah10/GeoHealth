import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_NEARBY_HOSPTIALS } from "../redux/query/user";
const GetNearbyHospitals = () => {
  const [getHospitals, { data }] = useLazyQuery(GET_NEARBY_HOSPTIALS);
  const [hospitals, setHospitals] = useState<any>([]);
  useEffect(() => {
    const getAllNearbyHospitals = (latitude, longitude) => {
        console.log(latitude)
      getHospitals({
        variables: {
          locationDetails: {
            latitude,
            longitude,
          },
        },
      });
    };
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getAllNearbyHospitals(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setHospitals(data.getNearbyHospitals);
    }
  }, [data]);
  return <div>Hello


    <div>
        {hospitals?.map((h:any, i:number) => {
            return(
                <div key={i}>
                    {h.name} pro in {h.speciality}
                </div>
            )
        })}
    </div>
  </div>;
};

export default GetNearbyHospitals;
