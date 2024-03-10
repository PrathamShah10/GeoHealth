import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {Link} from 'react-router-dom'
import { REACT_APP_GOOGLE_MAPS_KEY } from '../common/keys'
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { GET_NEARBY_HOSPTIALS } from "../redux/query/user";
import CustomMarker from "../common/hospital.png"
import { useNavigate } from "react-router";

const GetNearbyHospitals = () => {
  const [getHospitals, { data }] = useLazyQuery(GET_NEARBY_HOSPTIALS);
  const [hospitals, setHospitals] = useState<any>([]);
  const [uphospital , setUphospital ] = useState<any>([]);
  const [userloc, setUserloc] = useState(null)
  const [activeMarker, setActiveMarker] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Call fetchHospitalData here, after the state has been updated
    const storedLocation = localStorage.getItem('selectedLocation');

    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      setUserloc(parsedLocation);
    }

  }, []);

  
  useEffect(()=> {
    formatHospitals(hospitals);
  },[hospitals ,setUphospital])

  const formatHospitals = (hospitals) => { 
    const formattedHospitals = hospitals.map((h) => {
      return {
        name: h.name,
        position: { lat: h.latitude, lng: h.longitude },
        speciality: h.speciality,
        ids: h._id
      }; 
    });
  
    setUphospital(formattedHospitals); 
  };
  useEffect(()=>{
    console.log(uphospital)
  },[uphospital])
  useEffect(() => {
    const getAllNearbyHospitals = (latitude, longitude) => {
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

  useEffect(()=>{
    console.log(hospitals)
  },[hospitals])


  const handleActiveMarker = (marker , ids) => {
    // navigate(`/send-file/${ids}`);
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
    
  } 
  const handleclick = (ids) => {
    navigate(`/send-file/${ids}`);
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
  
  
  
  
  return (
    <div className="mmpage ">
    <div className="backdrop-blur-md p-1 h-screen">
      <div className='hmap w-4/6 ml-[28rem] mt-20 rounded-lg overflow-hidden'>
          <GoogleMap
            mapContainerStyle={{ height: "700px" }}
            center={userloc} 
            zoom={16}
            onLoad={onMapLoad}
            onClick={() => setActiveMarker(null)}
          >
          
           {

              uphospital.map(({ id, name, position , speciality , ids}) => (
                <MarkerF
                
                  options={
                    {
                      icon: {
                        url: './hospitalM.png', // Replace with the path to your smaller marker image
                        scaledSize: new window.google.maps.Size(75,75), // Set the desired width and height
                      },
                      
                      
                    }
                  }
                  key={id}
                  
                  position={position}
                  onClick={() => handleActiveMarker(id , ids)}
                >
                  {activeMarker === id ? (   
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div onClick={()=> handleclick(ids)}> <p className="font-semibold">{name} </p> <p>{speciality}</p> <p className="cursor-pointer rounded-md text-white mt-2 p-2 pl-4 bg-teal-400">Send</p> </div>
                     
                      
                    </InfoWindowF>
                  ) : null} 
                </MarkerF> 
              ))
            }

      
          </GoogleMap>

        </div>
      <div>
        {/* {hospitals?.map((h: any, i: number) => {
          return (
            <div key={i}>
              <Link to={`/send-file/${h._id}`} >{h.name} with {h._id} pro in </Link>
            </div>
          );
        })} */}
      </div>
      </div>
    </div>
  );
};

export default GetNearbyHospitals;
