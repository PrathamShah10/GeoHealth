import React, { useState, useEffect } from 'react';
import { REACT_APP_GOOGLE_MAPS_KEY } from '../common/keys'
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';


const HospitalMap = ({userloc , convertedArray}) => {

  const [activeMarker, setActiveMarker] = useState(null);
  console.log(convertedArray)
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
    <div className="mmpage">
      <div className='mainpage w-screen font-Rubik backdrop-blur-sm'>
        <div>
          <GoogleMap
            mapContainerStyle={{ height: "800px" }}
            center={userloc}
            zoom={16}
            onLoad={onMapLoad}
            onClick={() => setActiveMarker(null)}
          >
            {/* {hospital.map(({index , hospitals}) => (
              <MarkerF
                key={index}
                position={hospitals.location}
                onClick={()=> handleActiveMarker(index)}
              > 
                <div>{hospitals.displayName.text}</div>
              </MarkerF>
              // <div key={index}>
              //   <h3>{hospitals.displayName.text}</h3>
              //   <p>Latitude: {hospitals.location.latitude}</p>
              //   <p>Longitude: {hospitals.location.longitude}</p>
              // </div>
            ))} */}
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

          <h1 className='pt-40 ml-40 h-screen'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatibus pariatur sapiente autem asperiores odio odit quos quis ab vel, nisi iste itaque optio commodi exercitationem magnam esse eveniet mollitia!</h1>
          <button className='ml-96 bg-white h-10 w-10 mt-10' ></button>
        </div>
      </div>

    </div>
  </>)
};

export default HospitalMap;
