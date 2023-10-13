import React, { useState, useEffect } from "react";
const api = {
  key: "6fc1e3f071eee77edf5d1875afb50ad5",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      // Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);  
        const data = await response.json();
         if (response.ok) {
          setWeatherInfo(`${data.name}, ${data.sys.country}, ${data.weather[0].main}, ${data.weather[0].description}`);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        } 
      } catch (error) {
        setErrorMessage(error.message);
      };
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="city"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        ></input>
        <button>Search</button>
      </form>
      {loading? (<div>Loading....</div>) : (<> {errorMessage? (<div style={{ color: "red" }}>{errorMessage}</div>) : (<div>{weatherInfo}</div>)}</>)}
    </>
  );
}

export default App;
