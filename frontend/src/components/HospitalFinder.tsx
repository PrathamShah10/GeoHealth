import React, { useState, useEffect } from 'react';
import { REACT_APP_GOOGLE_MAPS_KEY } from '../common/keys'
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import HospitalMap from './HospitalMap';


const HospitalFinder = () => {

  const [userloc, setUserloc] = useState(null)
  const [activeMarker, setActiveMarker] = useState(null);
  const [hospital, setHospital] = useState([]);
  const [convertedArray, setConvertedArray] = useState([]);
  const [render, setrender] = useState(false);
  const [requestBody, setRequestBody] = useState(undefined);

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





    try {

      if (userloc) {
        console.log('req', requestBody)
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
        setHospital(data.places);
        console.log(data.places)
        hospital.length && setConvertedArray(
          hospital.map((item, index) => ({
            id: index + 1,
            name: item.displayName.text,
            position: {
              lat: item.location.latitude,
              lng: item.location.longitude,
            },
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    hospital.length && setConvertedArray(
      hospital.map((item, index) => ({
        id: index + 1,
        name: item.displayName.text,
        position: {
          lat: item.location.latitude,
          lng: item.location.longitude,
        },
      }))
    );
  }, [hospital]);

  useEffect(() => {
    userloc && setRequestBody({
      includedTypes: ["hospital"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: userloc?.lat,
            longitude: userloc?.lng
          },
          radius: 500.0
        }
      }
    });

    // Use parsedLocation as needed
  }, [userloc]);
  useEffect(() => {
    if (requestBody) {
      fetchHospitalData();
    }
  }, [requestBody])
  useEffect(() => {
    // Call fetchHospitalData here, after the state has been updated
    const storedLocation = localStorage.getItem('selectedLocation');

    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      setUserloc(parsedLocation);
    }

  }, []);

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
    <div className="mmpage ">
      <div className='mainpage w-screen font-Rubik backdrop-blur-sm overflow-hidden'>
        <div>
          {<HospitalMap userloc={userloc} convertedArray={convertedArray} />}


        </div>
      </div>

    </div>
  </>)

};

export default HospitalFinder;
