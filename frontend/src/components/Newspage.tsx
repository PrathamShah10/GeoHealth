import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../common/Dropdown";
import { IDropdown } from "../interface/user";
import VNavbar from "./VNavbar";
import { useAppSelector } from "../hooks/redux";
import Maps from "./Maps";
import AirQuality from "./AirQuality";

const Newspage = () => {
  const [selectedState, setSelectedState] = useState<IDropdown | null>(null);
  const [status, setStatus] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [responseArray, setResponseArray] = useState<string[] | null>(null);
  const { user } = useAppSelector((state) => state.user);
  const [showdata, setShowdata] = useState(false);
  const [diseaseinfo, setDiseaseInfo] = useState("");
  const [query, setQuery] = useState("/");
  const [disease, setDisease] = useState("");
  const [showDiseaseinfo, setShowDiseaseinfo] = useState(false);
  const [selectedTab, setSelectedTab] = useState("about");
  const [responselink, setResponseLink] = useState<
    { link: string; title: string }[] | null
  >(null);
  // console.log(responseArray)
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 31.1048,
    lng: 77.1734,
  });
  const [isMapBig, setIsMapBig] = useState(true);
  const zoomlevel = 10.5;
  const findMyCity = async () => {
    const success = (position: GeolocationPosition) => {
      console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const Latlng = {
        lat: latitude,
        lng: longitude,
      };
      localStorage.setItem("selectedLocation", JSON.stringify(Latlng));
      setSelectedLocation(Latlng);

      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&{localityLanguage=en`;

      fetch(geoApiUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCity(data.city);
          fetchData(data.city);
        });
    };

    const error = () => {
      setStatus("Unable to retrieve your location");
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

  // const handleClick = (newQuery: string) => {

  //   fetchInfo(disease); // Replace "SomeDefaultDisease" with the desired default disease or handle it based on your use case.
  // };

  const fetchData = async (city: string) => {
    try {
      const response = await fetch("http://localhost:5000/get_diseases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log(data.result);
      // Do something with the result
      setResponseArray(data.result.split(","));
      console.log(data.links);
      setResponseLink(data.links);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchInfo = async (disease: string) => {
    try {
      setDisease(disease);

      const response = await fetch("http://localhost:5000/get_info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ disease, query }),
        // Pass the current item
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.result);
      setDiseaseInfo(data.result);

      // Handle the data received from the "/get_info" endpoint
      // You can update the state or perform any other actions as needed
    } catch (error) {
      console.error("Error fetching info:", error);
    }
  };
  useEffect(() => {
    // This will run after the component renders and whenever newQuery changes
    fetchInfo(disease);
  }, [query]);

  return (
    <>
      <div className="mmpage">
        <div
          className={`mainpage w-screen font-Rubik ${
            isMapBig ? " backdrop-blur-2xl" : "backdrop-blur-sm"
          }`}
        >
          <div className="maps2 w-5/6 ml-auto relative min-h-screen h-auto p-1">
            <div>
              <div
                className={`mapss p-3 mt-28 absolute ml-auto mr-auto rounded-md bg-white transition-all duration-5000 ${
                  isMapBig
                    ? "h-[35rem] w-5/6 right-36 left-auto "
                    : "h-[24rem] w-96 right-36"
                }`}
              >
                {/* <Maps
                  selectedLocation={selectedLocation}
                  zoomlevel={zoomlevel}
                /> */}
              </div>
            </div>
            <div className="h-auto">
              {showdata && (
                <>
                  <div className="AQ ml-16 mt-28 rounded-md w-3/6 min-h-72 bg-white flex justify-between">
                    <div>
                      {/* <AirQuality selectedLocation={selectedLocation} /> */}
                    </div>

                    <img
                      className="AQText shadow-lg rounded-xl h-32 mb-4 mt-4 mr-3"
                      src="./airQ.png"
                      alt=""
                    />
                  </div>
                  <div className="prevdis w-3/6 p-6 ml-16 mb-10 mt-8 shadow-md rounded-md bg-white min-h-[20rem]">
                    <h1 className="text-3xl font-extrabold text-gray-600">
                      Current Prevalent Diseases in {city}
                    </h1>
                    {responseArray ? (
                      <>
                        <div className="parentsd">
                          {/* Map over the array and create a div for each item */}
                          {responseArray.map((item, index) => (
                            <div
                              className="group border-2 p-2 rounded-md pl-3 flex mt-5 justify-between"
                              key={index}
                            >
                              <h1
                                className=""
                                onClick={() => {
                                  fetchInfo(item);
                                  setShowDiseaseinfo(!showDiseaseinfo);
                                }}
                              >
                                {item}
                              </h1>
                              <p className="group-hover:text-gray-600 text-transparent duration-300 transition">
                                more info...
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="loading"></div>
                        <div className="loading"></div>
                        <div className="loading"></div>
                        <div className="loading"></div>
                        <div className="loading"></div>
                      </>
                    )}
                  </div>
                  <div className="responselink -mt-60 absolute right-36 w-96 bg-white rounded-md p-4">
                    <h1 className="text-xl font-bold text-gray-600 mb-4">
                      Top Latest Health Articles
                    </h1>
                    {responselink && responselink.length > 0 ? (
                      <ul className="list-disc">
                        {responselink.map((item, index) => (
                          <li
                            key={index}
                            className=" text-wrap text-decoration-none list-none"
                          >
                            <a
                              className=" text-decoration-none text-wrap list-none"
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No links available.</p>
                    )}
                  </div>
                  {showDiseaseinfo && (
                    <>
                      <div className="varynice w-3/6 ">
                        <div className="asdf flex  w-full shadow-md rounded-md relative z-14 text-lg cursor-pointer ml-16 p-2">
                          <h1
                            className={`ml-6 p-2  text-white ${
                              selectedTab === "about" &&
                              "bg-white rounded-md text-black"
                            }`}
                            onClick={() => {
                              setQuery("/");
                              setSelectedTab("about");
                            }}
                          >
                            About
                          </h1>
                          <h1
                            className={`ml-6 p-2 text-white ${
                              selectedTab === "prevention" &&
                              "bg-white  rounded-md text-black"
                            }`}
                            onClick={() => {
                              setQuery("/prevention");
                              setSelectedTab("prevention");
                            }}
                          >
                            Prevention
                          </h1>
                          <h1
                            className={`ml-6 p-2 text-white ${
                              selectedTab === "symptoms" &&
                              "bg-white  rounded-md text-black"
                            }`}
                            onClick={() => {
                              setQuery("/symptoms");
                              setSelectedTab("symptoms");

                              console.log("symp");
                            }}
                          >
                            Symptoms
                          </h1>
                        </div>
                        <div className="symptoms bg-white ml-16 p-8 shadow-sm w-full relative z-12 ">
                          <p className="w-11/12 ">{diseaseinfo}</p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newspage;
