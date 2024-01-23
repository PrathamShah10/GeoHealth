import React, { useState, useEffect } from 'react';
import { REACT_APP_GOOGLE_MAPS_KEY } from '../common/keys'
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import HospitalMap from './HospitalMap';


const HospitalFinder = () => {

  const [userloc, setUserloc] = useState({ lat: 0, lng: 0 })
  const [activeMarker, setActiveMarker] = useState(null);
  const [hospital, setHospital] = useState([]);
  const [convertedArray, setConvertedArray] = useState([]);
  const [render, setrender] = useState(false);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  }
  // useEffect(() => {
  //   // Update convertedArray after hospital state is updated

  // }, [hospital]);

  const fetchHospitalData = async () => {

    const apiUrl = 'https://places.googleapis.com/v1/places:searchNearby';


    const requestBody = {
      includedTypes: ["hospital"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: userloc.lat,
            longitude: userloc.lng
          },
          radius: 500.0
        }
      }
    };


    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': REACT_APP_GOOGLE_MAPS_KEY,
          'X-Goog-FieldMask': 'places.displayName,places.location',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status}: ${response.statusText})`);
      }

      const data = await response.json();
      // console.log('Response:', data);
      setHospital(data.places);
      console.log(hospital)
      setConvertedArray(
        hospital.map((item, index) => ({
          id: index + 1,
          name: item.displayName.text,
          position: {
            lat: item.location.latitude,
            lng: item.location.longitude,
          },
        }))
      );
      // console.log(convertedArray)
      setrender(true)
      

      // Handle the data as needed
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    const storedLocation = localStorage.getItem('selectedLocation');

    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      setUserloc(parsedLocation);
      fetchHospitalData();
      // Use parsedLocation as needed
      console.log('Retrieved Latlng from local storage:', parsedLocation);
    }
  }, []);
  
  useEffect(() => {
    // Call fetchHospitalData here, after the state has been updated
   

  }, [userloc]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY
  })
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {

  }, []);
  if (!isLoaded) return null;
  // Add userloc to the dependency array
  // console.log(hospital)
 
  return (<>
    <div className="mmpage">
      <div className='mainpage w-screen font-Rubik backdrop-blur-sm'>
        <div> 
         { <HospitalMap userloc={userloc} convertedArray={convertedArray} /> }
          
          <h1 className='pt-40 ml-40 h-screen'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatibus pariatur sapiente autem asperiores odio odit quos quis ab vel, nisi iste itaque optio commodi exercitationem magnam esse eveniet mollitia!</h1>
          <button className='ml-96 bg-white h-10 w-10 mt-10' ></button>
        </div>
      </div>

    </div> 
  </>)

};

export default HospitalFinder;
