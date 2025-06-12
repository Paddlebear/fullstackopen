import { useState, useEffect } from 'react'
import countryService from '../services/countries'

const Country = ({ country, handleBack }) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        console.log('getting weather...');
        const lat = country.capitalInfo.latlng[0]
        const lon = country.capitalInfo.latlng[1]
        countryService.getWeather({ lat, lon }).then(initialWeather => {
            setWeather(initialWeather)
        }).catch(error => {
        console.log('bad request, most likely cause: no API key or bad API key provided')
      })
    }, [country])

    const weatherIconLink = weather
        ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        : null

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(language =>
                    <li key={language}>{language}</li>
                )}
            </ul>
            <p><img src={country.flags.png} alt={country.flags.alt} /></p>
            <h2>Weather in {country.capital[0]}</h2>
            {weather 
                ? (
                <div>
                    <p>Temperature {weather.main.temp} Celsius</p>
                    <p><img src={weatherIconLink} alt="weather icon" /></p>
                    <p>Wind {weather.wind.speed} m/s</p>
                </div>
                ) 
                : 
                ( <p>Loading weather...</p> )}
            <p><button onClick={event => handleBack(event)}>Back</button></p>
        </div>
    )
}

export default Country