

import React, { useState } from "react";

const App = () => {
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState(null);
  const[loading,setloading]=useState(false)
  const[error,setError]=useState(null);
  const [submittedCity, setSubmittedCity] = useState("");



  const fetchWeatherData = async () => {
    setloading(true)
    try {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6fba2f851fb011f3d96e87b4c711267f&units=metric`
      );

      if (!result.ok) {
                throw new Error('City not found');
              }
             
      const output = await result.json();
     
      setData(output);
    } catch (error) {
            setError(error.message);
    }
    setloading(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityName.trim() !== "") {
      setSubmittedCity(cityName); 
      fetchWeatherData(cityName);
    }
  };

  const handleChange = (e) => {
    setCityName(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center space-y-4"
      >
        <h1 className="text-3xl font-bold">Aryan Weather App</h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:w-96">
          <input
            type="text"
            placeholder="Enter your city...."
            // value={cityName}
            onChange={handleChange}
            className="p-4 border-2 border-gray-400 rounded-md w-full"
          />
        
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {/* {loading && setData(null) } */}
      {error && <p>{error}</p>}
      {!loading && data &&(
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">{submittedCity}, India</h2>
        <p className="mb-4">Current Date:{" "}
          <span className="font-semibold">
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(new Date())}
          </span>
        </p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <p className="flex items-center">
            <span className="mr-2">Temperature:</span> 
            <span className="font-semibold">{data.main.temp}°C</span>
          </p>
          <p className="flex items-center">
            <span className="mr-2">Wind Speed:</span> 
            <span className="font-semibold">{data.wind.speed} m/s</span>
          </p>
        </div>
        <p className="mb-4">
          <span className="mr-2">Description:</span> 
          <span className="capitalize font-semibold">{data.weather[0].description}</span>
        </p>
      </div>
      
      )}
    </div>
  );
};

export default App;



