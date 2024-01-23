import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { REACT_APP_GOOGLE_MAPS_KEY } from '../common/keys'


const Maps = ({ selectedLocation, zoomlevel }) => {
  const [zooms, setzooms] = useState(4);
  const [mapContainerHeight, setMapContainerHeight] = useState(32);
  


  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increase count by 1 until it reaches the final value
      if (zooms < zoomlevel) {
        setzooms((prevCount) => prevCount + 0.1);
      } else {
        // Clear the interval when count reaches the final value
        clearInterval(intervalId);
      }
    }, 50);
    return () => clearInterval(intervalId);
  }, [zooms, setzooms]);

  useEffect(() => {
    // Change map container height to 500px after 5 seconds
    const timeoutId = setTimeout(() => {
      setMapContainerHeight(22);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY
  })
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {

  }, []);
  if (!isLoaded) return null;

  return (
    <>
      <div className='mt-1'>
        <GoogleMap
          mapContainerStyle={{ height: `${mapContainerHeight}rem` }}
          center={selectedLocation}
          zoom={zooms}
          onLoad={onMapLoad}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            scrollwheel: false,
            scaleControl: false

          }}
        >




        </GoogleMap>
      </div>
    </>
  );


}

export default Maps;