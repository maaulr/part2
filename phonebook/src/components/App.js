import React, { useEffect, useState } from 'react'
import phonebookService from './services'

const PhonebookNames = ({persons, handleDelete}) => {
    return (
        <div>
            {persons.map(person=>
                <p key={person.name}>{person.name} {person.number} <button onClick={()=>handleDelete(person.id)}>delete</button></p>    
            )}
        </div>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  useEffect(()=>{
    phonebookService
      .getAll()
      .then(persons=>setPersons(persons))
  }, [])

  const handleAddName = (event) => {
    event.preventDefault()
    const personExist = persons.filter((person)=>person.name===newName)
    
    if (personExist.length>0){
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)){
          const indexPersonUpdate = persons.indexOf(personExist[0])
          const updatedPhonebook = [...persons]
          const updatePerson = { name: personExist[0].name, number: newNumber }
          const res = phonebookService.updatePerson(personExist[0].id, updatePerson)
          res.then(updatedPerson=>{
            updatedPhonebook[indexPersonUpdate].number = updatedPerson.number
            setPersons(updatedPhonebook)
          })
        } else {}
    } else {
        const new_person = { name: newName, number: newNumber }
        const res = phonebookService.addPerson(new_person)
        res.then(newPerson=>setPersons(persons.concat(newPerson)))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDeleteName = (id) => {
    const PersonToDelete = persons.find(person=>person.id === id)
    const indexPersonDelete = persons.indexOf(PersonToDelete)
    if (window.confirm(`Delete ${PersonToDelete.name}?`)){
      const res = phonebookService.deletePerson(id)
      const newPersons = [...persons]
      newPersons.splice(indexPersonDelete, 1)
      setPersons(newPersons)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleFormNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleFormNumChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
      setNewFilter(event.target.value)
  }

  const filteredPerson = newFilter === ''
    ? persons
    : persons.filter((person)=>person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddName}>
        <div>
          name: <input value={newName} onChange={handleFormNameChange}/><br/>
          number: <input value={newNumber} onChange={handleFormNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      filter: <input value={newFilter} onChange={handleFilterChange}/>
      <PhonebookNames persons={filteredPerson} handleDelete={handleDeleteName}/>
    </div>
  )
}

export default App