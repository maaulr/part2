import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayWeather = ({capitalWeather}) => {
  if (capitalWeather.location !== undefined){
    return (
      <div>
        <h3>Weather in {capitalWeather.location.name}</h3>
        <p>Temperature: {capitalWeather.current.temperature} celcius</p>
        <img alt="capital weather" src={capitalWeather.current.weather_icons}/>
        <p>Wind: {capitalWeather.current.wind_speed} direction {capitalWeather.current.wind_dir}</p>
      </div>
      )
  }
  return <></>
}

const DisplayCountry = ({countries, handleShowButton, capitalWeather}) => {
  if (countries.length === 0){
    return <><p>Too many matches, specify your filter</p></>
  } else if (countries.length === 1){
    return (
      <>
        <h1>{countries[0].name}</h1>
        <p>Capital {countries[0].capital}</p>
        <p>Population {countries[0].population}</p>
        <h3>language</h3>
        <ul>
          {countries[0].languages.map(lang=><li key={lang.name}>{lang.name}</li>)}
        </ul>
        <img alt={countries[0].name} src={countries[0].flag} width={250}/>
        <DisplayWeather capitalWeather={capitalWeather}/>
      </>
    )
  } else {
    return (
      <>
        {countries.map(country=>
          <p key={country.name}>{country.name} 
          <CountryButton handleShowButton={handleShowButton} countryName={country.name}/>
          </p>)}
      </>
    )
  }
}

const CountryButton = ({handleShowButton, countryName}) => {
  return (
    <><button onClick={()=>handleShowButton(countryName)}>show</button></>
  )
}

const App = () => {
  const weatherApi = process.env.REACT_APP_WEATHER_API
  const [ countries, setCountries] = useState([])
  const [ filterCountries, setFilter] = useState('')
  const [ countriesToDisplay, setCountriesToDisplay ] = useState([])
  const [ capitalWeather, setWeather] = useState({})

  const getCapitalWeather = (capital) => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${weatherApi}&query=${capital}`)
      .then(response=>setWeather(response.data))
  }
  
  const handleFilterInput = (event) => {
    setFilter(event.target.value)
    const filteredCountries = countries.filter((country)=>country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    if (filteredCountries.length > 10){
      setCountriesToDisplay([])
    } else {
      setCountriesToDisplay(filteredCountries)
    }

    if (filteredCountries.length === 1){
      getCapitalWeather(filteredCountries[0].capital)
    }
  }

  const handleShowButton = (countryName) => {
    const filteredCountries = countries.filter((country)=>country.name.toLowerCase().includes(countryName.toLowerCase()))
    setCountriesToDisplay(filteredCountries)

    if (filteredCountries.length === 1){
      getCapitalWeather(filteredCountries[0].capital)
    }
  }

  useEffect(()=>{
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response=>(
        setCountries(response.data)
      ))
  }, [])

  return (
    <div>
      find countries: <input value={filterCountries} onChange={handleFilterInput}/>
      <DisplayCountry countries={countriesToDisplay} handleShowButton={handleShowButton} capitalWeather={capitalWeather}/>
    </div>
  )
}

export default App;
