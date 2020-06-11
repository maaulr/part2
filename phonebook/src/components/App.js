import React, { useState } from 'react'

const PhonebookNames = ({persons}) => {
    return (
        <div>
            {persons.map(person=>
                <p key={person.name}>{person.name} {person.number}</p>    
            )}
        </div>
    )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number:'040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  const handleAddName = (event) => {
    event.preventDefault()
    const personExist = persons.filter((person)=>person.name===newName)
    
    if (personExist.length>0){
        alert(`${newName} is already added to phonebook`)
    } else {
        const new_person = { name: newName, number: newNumber }
        setPersons(persons.concat(new_person))
        setNewName('')
        setNewNumber('')
    }
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
      <PhonebookNames persons={filteredPerson}/>
    </div>
  )
}

export default App