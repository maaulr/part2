import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayCountry = ({countries, handleShowButton}) => {
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
        <img alt={countries[0].name} src={countries[0].flag} width={250} />
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
  const [ countries, setCountries] = useState([])
  const [ filterCountries, setFilter] = useState('')
  
  const handleFilterInput = (event) => {
    setFilter(event.target.value)
  }

  const handleShowButton = (countryName) => {
    setFilter(countryName)
  }

  useEffect(()=>{
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response=>(
        setCountries(response.data)
      ))
  }, [])

  const filteredCountries = countries.filter((country)=>country.name.toLowerCase().includes(filterCountries.toLowerCase()))
  let countriesToDisplay = [] 

  if (filteredCountries.length > 10){
    countriesToDisplay = []
  } else {
    countriesToDisplay = filteredCountries
  }

  return (
    <div>
      find countries: <input value={filterCountries} onChange={handleFilterInput}/>
      <DisplayCountry countries={countriesToDisplay} handleShowButton={handleShowButton}/>
    </div>
  )
}

export default App;
