import React, { useState } from 'react';
import axios from 'axios';
import VNavbar from './VNavbar';

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

  return (<>
    <div className='flex bg-keppel-400'>
      <VNavbar />
      <div className='w-5/6'>
        <div className=" mt-5 ml-5 mr-5 bg-white flex justify-between mx-auto h-40 rounded shadow-md ">
          <div>
            <h1 className="font-semibold p-4 text-2xl">Nearby Hospital</h1>

            <p className="font-normal pl-4 text-xl">Find the Nearby hospital around you.</p>

          </div>
          <img className="p-4 pr-10" src="./hospital2.png" alt="" />
        </div>
        <div className='bg-white h-32 mr-5 mx-auto ml-5 mt-5 rounded p-10'>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
          />
          <button className='bg-sea-green-400 text-white font-semibold p-2 rounded-xl ml-5' onClick={findHospitals}>Find Hospitals</button>
          <ul>
            {hospitals.map((hospital: any) => (
              <li className='text-black font-semibold ' key={hospital.place_id}>
                {hospital.name} - {hospital.formatted_address}
              </li>
            ))}
          </ul>
        </div>
      </div> </div> </>);
};

export default HospitalFinder;
