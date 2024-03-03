import { useState, useEffect } from "react";
import { IDropdown } from "../interface/user";
import { useAppSelector } from "../hooks/redux";



const Newspage = () => {
 
  const [status, setStatus] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [responseArray, setResponseArray] = useState<string[] | null>(null);
  const [showdata, setShowdata] = useState(false);
  console.log(responseArray)
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 31.1048,
    lng: 77.1734,
  });
  const [isMapBig, setIsMapBig] = useState(true);
  const findMyCity = async () => {
    const success = (position: GeolocationPosition) => {
      console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const Latlng = {
        lat: latitude,
        lng: longitude,
      };
      localStorage.setItem('selectedLocation', JSON.stringify(Latlng));
      setSelectedLocation(Latlng);
      
      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&{localityLanguage=en`

      fetch(geoApiUrl)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setCity(data.city);
          // fetchData(data.city);
        })
    };


    const error = () => {
      setStatus('Unable to retrieve your location');
    };

    navigator.geolocation.getCurrentPosition(success, error);


  };
  useEffect(() => {
    findMyCity();
    const timeoutId = setTimeout(() => {
      setIsMapBig(false);
      setShowdata(true);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);




  const fetchData = async (city: string) => {
    try {
      const response = await fetch('http://localhost:5000/get_diseases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.result);
      // Do something with the result
      setResponseArray(data.result.split(","));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  return (
    <>
      <div className="mmpage">
        <div className={`mainpage w-screen font-Rubik ${isMapBig ? ' backdrop-blur-2xl' : 'backdrop-blur-sm'
          }`}>
          <div className="w-5/6 ml-auto relative min-h-screen h-auto p-1">
            <div>
              <div
                className={`mapss p-3 mt-28 absolute ml-auto mr-auto rounded-md bg-white transition-all duration-5000 ${isMapBig ? ' h-[35rem] w-5/6 right-36 left-auto ' : 'h-[24rem] w-96 right-36'}`}
              >
              </div>
            </div>
            <div className="h-auto">
              {showdata && (
                <>
                  <div className="AQ ml-16 mt-28 rounded-md w-3/6 min-h-72 bg-white flex justify-between">
                    <div>
                      {/* <AirQuality selectedLocation={selectedLocation} /> */}
                    </div>

                    <img className="AQText shadow-lg rounded-xl h-32 mb-4 mt-4 mr-3" src="./airQ.png" alt="" />
                  </div>
                  <div className=" w-3/6 p-6 ml-16 mb-10 mt-8 shadow-md rounded-md bg-white min-h-[30rem]">
                    <h1 className="text-3xl font-extrabold text-gray-600">Current Prevalent Diseases in {city}</h1>
                    {responseArray ? (
                      <>
                        <div className="parentsd">
                          {/* Map over the array and create a div for each item */}
                          {responseArray.map((item, index) => (
                            <div className="group border-2 p-2 rounded-md pl-3 flex mt-5 justify-between" key={index}>
                              <h1 className="">{item}</h1>
                              <p className="group-hover:text-gray-600 text-transparent duration-300 transition">more info...</p>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (<>
                      <div className="loading"></div>
                      <div className="loading"></div>
                      <div className="loading"></div>
                      <div className="loading"></div>
                      <div className="loading"></div>
                    </>)
                    }

                  </div>

                </>
              )}

            </div>
          </div>
        </div>
      </div></>
  );
};

export default Newspage;
