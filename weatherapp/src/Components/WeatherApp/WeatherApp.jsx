import React, { useState, useEffect } from 'react'
import './WeatherApp.css'

import seach_icon from '../Assets/search.png' 
import clear_icon from '../Assets/clear.png' 
import cloud_icon from '../Assets/cloud.png' 
import drizzle_icon from '../Assets/drizzle.png' 
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png' 
import wind_icon from '../Assets/wind.png' 
import humidity_icon from '../Assets/humidity.png' 


const WeatherApp = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const api_key = "bf5f6b3a9087f6c0c0213ee6aedc7482";
    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("city-input");
        if (element[0].value === "")
        {
            return 0;
        }

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}&lang=fr`

        try {
            const weather = await fetch(weatherUrl);

            if (!weather.ok)
            {
                throw new Error(`Failed to fetch data: ${weather.status}`);
            }
            const data = await weather.json();
            setErrorMessage("");

            const humidity = document.getElementsByClassName("humidity-percent");
            const wind = document.getElementsByClassName("wind-rate");
            const temperature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");
            
    
            humidity[0].innerHTML = data.main.humidity + " %";
            wind[0].innerHTML = data.wind.speed + " km/h";
            temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
            location[0].innerHTML = data.name;
    
            if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
            {
                setWicon(clear_icon);
            }
            else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
            {
                setWicon(cloud_icon);
            }
            else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n")
            {
                setWicon(drizzle_icon);
            }
            else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n")
            {
                setWicon(drizzle_icon);
            }
            else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
            {
                setWicon(rain_icon);
            }
            else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n")
            {
                setWicon(rain_icon);
            }
            else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n")
            {
                setWicon(snow_icon);
            }
            else
            {
                setWicon(clear_icon);
            }
        }
        catch (error)
        {
            console.error("An error occurred while fetching weather data:", error);
            setErrorMessage("Failed to fetch weather data. Please try again later."); // Update the state to show error message
        }
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter')
        {
            await search();
        }        
    }
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
  
    const getLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        return;
      }
  
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }, (error) => {
        setError(error.message);
      });
    };
  
    useEffect(() => {
      getLocation();
    }, []);

  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="city-input" placeholder='Search' onKeyDown={handleKeyDown}/>
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={seach_icon} alt="" draggable={false} />
            </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="weather-image">
            <img src={wicon} alt="" draggable={false} />
        </div>
        <div className="weather-temp">24°c</div>
        <div className="weather-location">London</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" className="icon" draggable={false} />
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="" className="icon" draggable={false} />
                <div className="data">
                    <div className="wind-rate">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp