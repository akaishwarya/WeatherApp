import './App.css'
// Images
import searchIcon from "./assets/search.png";
import humidityIcon from "./assets/humidity.png";
import windIcon from "./assets/wind.png";
import clearIcon from "./assets/01d.png";
import cloudIcon from "./assets/02d.png";
import scattered  from "./assets/03n.png";
import drizzleIcon from "./assets/04n.png";
import cloudnIcon from "./assets/02n.png";
import 	brokenClouds from "./assets/04n.png";
import rainIcon from "./assets/10n.png";
import raindIcon from "./assets/10dd.png";
import snowIcon from "./assets/13n.png";
import thunderstorm from "./assets/11n.png";

import { useState, useEffect } from 'react';


const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
  return ( 
    <> 
    <div className="image">
      <img src={icon} alt="" />
    </div>
    <div className="temp"> {temp}°C </div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
        <span className="lat">Latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className="log">longitude</span>
        <span>{log}</span>
      </div>
    </div> 
    <div className="data-container">

      <div className="element">
        <img src={humidityIcon} alt="humidity" className='icon' />
        
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>

        </div>

      </div>
      <div className="element">
        <img src={windIcon} alt="wind" className='icon' />
        
        <div className="data">
          <div className="wind-speed">{wind} km/h</div>
          <div className="text">Wind Speed</div>

        </div>

      </div>

    </div>
      
    </>
     )
}

function App() {
  let api_key = "35099e15562cd9a1c7eb8f1068dc6ff1";
  const [text, setText] = useState("America")

const [icon, setIcon] = useState(rainIcon);
const [temp, setTemp] = useState(0);
const [city, setCity] = useState("America");
const [country, setCountry] = useState("");
const [lat, setLat] = useState(0);
const [log, setLog] = useState(0);
const [humidity, setHumidity] = useState(0);
const [wind, setWind] = useState(0);
const [cityNotFound, setCityNotFound] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);   

const weatherIconMap = {
  "01n": clearIcon,
  "01d": clearIcon,
  "02n": cloudnIcon,
  "02d": cloudIcon,
  "03d": brokenClouds,
  "03n": scattered,
  "04d": brokenClouds,
  "04n": drizzleIcon,
  "09d": raindIcon,
  "09n": rainIcon,
  "10d": rainIcon,
  "10n": rainIcon,
  "11n": thunderstorm,
  "13d": snowIcon,
  "13n": snowIcon,
  
}


  const search = async () => {
    
    setLoading(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`

    try{
      let res = await fetch(url);  
      let data = await res.json();
      console.log(data)

      if(data.cod === "404"){
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);

    }catch(error){
      console.error("An error occurred:", error.message);
      setError("An error occurred while fetching Weather data.")
    }finally{
      setLoading(false);
    }
  }
  useEffect(function() {
    search()
  }, [])

  const handleCity = (e) => {
    setText(e.target.value);
  }; 
  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
      search();
    }
  }

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type="text" className='cityInput' onChange={handleCity} onKeyDown={handleKeyDown} placeholder='Search City' value={text} />
          <div className='search-icon' onClick={() => search() }>
            <img src={searchIcon}  className='search-img' alt="Search" />
          </div>
        </div>

       
      { loading && <div className="loading">Loading....</div> } 
      { error && <div className="error">{error}</div>}
      { cityNotFound && <div className='cityNot-Found'>City Not Found</div>}

     { !loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} humidity={humidity} wind={wind}  lat={lat} log={log} />}


        <p className="copyright"> Designed by <span>Aishwarya</span>  </p>
      </div>
      
    </>
  )
}

export default App;
