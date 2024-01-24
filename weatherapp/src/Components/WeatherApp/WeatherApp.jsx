import React from 'react'
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
  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="city-input" placeholder='Search'/>
            <div className="search-icon">
                <img src={seach_icon} alt="" draggable={false} />
            </div>
        </div>
        <div className="weather-image">
            <img src={cloud_icon} alt="" draggable={false} />
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
                    <div className="humidity-percent">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp