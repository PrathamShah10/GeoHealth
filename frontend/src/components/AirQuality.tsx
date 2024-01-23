import React, { useEffect , useState} from 'react';
import { REACT_APP_GOOGLE_MAPS_KEY } from '../common/keys'
const AirQuality = ({ selectedLocation }) => {

    const [airQualityData, setAirQualityData] = useState(null);
    const fetchAirQuality = async () => {
        const url = 'https://airquality.googleapis.com/v1/currentConditions:lookup?key=' + REACT_APP_GOOGLE_MAPS_KEY;

        const requestBody = {
            universalAqi: false,
            location: {
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng
            },
            extraComputations: [
                "HEALTH_RECOMMENDATIONS",
                "DOMINANT_POLLUTANT_CONCENTRATION",
                "POLLUTANT_CONCENTRATION",
                "LOCAL_AQI",
                "POLLUTANT_ADDITIONAL_INFO"
            ],
            languageCode: "en"
        };


        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setAirQualityData(data);
            
            
            
            // Handle the data as needed
        } catch (error) {
            console.error('Error fetching air quality:', error.message);
        }
    };

    useEffect(() => {
        fetchAirQuality();
    }, []); // Runs once when the component mounts
    
    return (
        <div className='AQText p-6'>
            {airQualityData && (
                <>
                <h1 className='font-extrabold text-3xl font-Rubik text-gray-600'>Air Quality Today</h1>
                <h1 className='font-medium pt-2 text-xl font-Rubik text-gray-800'>{airQualityData.indexes[0].category }</h1>
                <p className='font-medium text-xl font-Rubik text-gray-800'>AQI: {airQualityData.indexes[0].aqi}</p>
                <p className='font-medium text-xl font-Rubik text-gray-800'>{airQualityData.healthRecommendations.generalPopulation}</p>
                </>
            )}
            
        </div> 
    );
};

export default AirQuality;
