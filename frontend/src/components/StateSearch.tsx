import React, { useState, useEffect } from 'react';

interface Recipe {
    name: string;
    ingredients: string;
    diet: string;
    prep_time: number;
    cook_time: number;
    flavor_profile: string;
    course: string;
    state: string;
    region: string;
}

function StateSearch() {
    const [searchState, setSearchState] = useState<string>('');
    const [data, setData] = useState<Recipe[]>([]);
    const [results, setResults] = useState<Recipe[]>([]);

    useEffect(() => {
        // Fetch data from the JSON file in the same directory
        fetch('./indian_food.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData: Recipe[]) => {
                setData(jsonData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchState(e.target.value);
    };

    const searchForState = () => {
        const filteredResults = data.filter(
            (item) => item.state.toLowerCase() === searchState.toLowerCase()
        );
        setResults(filteredResults);
    };

    return (
        <div className='w-2/3 pb-10 ml-auto mr-auto mt-10 p-1 rounded-lg bg-white shadow-lg pl-10'>
            <h1 className='font-bold text-2xl p-1 text-sea-green-600 mt-6'>Search for Recipes by State</h1>
            <label className='ml-6 text-xl mt-10 font-semibold' htmlFor="stateInput">Enter a state: </label>
            <input className='border-2 pl-2 border-sea-green-500 rounded-lg ml-0' type="text" id="stateInput" value={searchState} onChange={handleStateChange} />
            <button className='ml-20 bg-sea-green-500 text-white p-1 rounded-md shadow-lg' onClick={searchForState}>Search</button>

            {results.length > 0 ? (
                <div>
                    <h2 className='pl-10 mt-4 font-semibold text-2xl'>Recipes for {searchState}:</h2>
                    <ul className='mt-4'>
                        {results.map((item, index) => (
                            <li className='mt-5 ml-10 flex shadow-md mr-20 p-4 rounded-lg' key={index}>
                                <div>
                                    <h3 className='text-xl font-bold text-sea-green-600'>{item.name}</h3>
                                    <p className='font-semibold mt-2'>Ingredients: {item.ingredients}</p>
                                    <p className='font-semibold mt-1'>Diet: {item.diet}</p>
                                    <p className='font-semibold mt-1'>Prep Time: {item.prep_time} minutes</p>
                                    <p className='font-semibold mt-1'>Cook Time: {item.cook_time} minutes</p>
                                    <p className='font-semibold mt-1'>Flavor Profile: {item.flavor_profile}</p>
                                    <p className='font-semibold mt-1'>Course: {item.course}</p>
                                    <p className='font-semibold mt-1'>Region: {item.region}</p>
                                </div>
                                <img className='h-44 mr-20 ml-auto' src="./food.png " alt="" />

                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p> </p>
            )}
        </div>
    );
}

export default StateSearch;