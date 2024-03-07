import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyDTBtrbG0LDmFLe98M08UYCTMSUmVOAy40';

const HospitalFinder: React.FC = () => {
  const [location, setLocation] = useState('');
  const [hospitals, setHospitals] = useState([]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const findHospitals = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=hospital+near+${location}&key=${API_KEY}`
      );

      setHospitals(response.data.results);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  return (
    <div>
      <h1>Hospital Finder</h1>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={handleLocationChange}
      />
      <button onClick={findHospitals}>Find Hospitals</button>
      <ul>
        {hospitals.map((hospital: any) => (
          <li key={hospital.place_id}>
            {hospital.name} - {hospital.formatted_address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalFinder;
