import React, { useState, useEffect } from 'react';
import { REACT_APP_GOOGLE_MAPS_KEY } from '../common/keys'
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';


const HospitalMap = ({userloc , convertedArray}) => {

  const [activeMarker, setActiveMarker] = useState(null);
  // console.log(convertedArray)
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  } 
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY
  })
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {

  }, []);
  if (!isLoaded) return null;
  // Add userloc to the dependency array
  

  
  

  return (<>
    
        <div className=' w-11/12 ml-auto overflow-hidden'>
          <GoogleMap
            mapContainerStyle={{ height: "900px" }}
            center={userloc} 
            zoom={16}
            onLoad={onMapLoad}
            onClick={() => setActiveMarker(null)}
          >
          
           {

              convertedArray.map(({ id, name, position }) => (
                <MarkerF
                  
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                >
                  {activeMarker === id ? (   
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div>{name}</div>
                    </InfoWindowF>
                  ) : null} 
                </MarkerF> 
              ))
            }

      
          </GoogleMap>

        </div>
     
  </>)
};

export default HospitalMap;
