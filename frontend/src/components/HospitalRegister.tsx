import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_HOSPITAL } from "../redux/query/user";
interface HospitalData {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  speciality: string;
}

const HospitalRegistration: React.FC = () => {
  const [registerHospital] = useMutation(ADD_HOSPITAL);
  const [hospitalData, setHospitalData] = useState<HospitalData>({
    name: "",
    location: { latitude: 0, longitude: 0 },
    speciality: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setHospitalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "latitude" | "longitude"
  ) => {
    const value = parseFloat(e.target.value);
    setHospitalData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [key]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted data:", hospitalData);
    // Add your logic to submit data to backend or store
    registerHospital({
      variables: {
        hospitalDetails: {
          name: hospitalData.name,
          speciality: hospitalData.speciality,
          latitude: hospitalData.location.latitude,
          longitude: hospitalData.location.longitude,
        },
      },
    });
  };

  return (
    <div>
      <h2>Hospital Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Hospital Name:
          <input
            type="text"
            name="name"
            value={hospitalData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Latitude:
          <input
            type="number"
            step="0.000001"
            name="latitude"
            value={hospitalData.location.latitude}
            onChange={(e) => handleLocationChange(e, "latitude")}
          />
        </label>
        <br />
        <label>
          Longitude:
          <input
            type="number"
            step="0.000001"
            name="longitude"
            value={hospitalData.location.longitude}
            onChange={(e) => handleLocationChange(e, "longitude")}
          />
        </label>
        <br />
        <label>
          Speciality:
          <select
            name="speciality"
            value={hospitalData.speciality}
            onChange={handleChange}
          >
            <option value="">Select Speciality</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Others">Others</option>
          </select>
        </label>
        <br />
        <button type="submit">Register Hospital</button>
      </form>
    </div>
  );
};

export default HospitalRegistration;
