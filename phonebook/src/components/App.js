import React, { useState } from 'react'

const PhonebookNames = ({persons}) => {
    return (
        <div>
            {persons.map(person=>
                <p key={person.name}>{person.name}</p>    
            )}
        </div>
    )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleAddName = (event) => {
    event.preventDefault()
    //   console.log('add name ' + newName)
    const new_person = { name: newName }
    setPersons(persons.concat(new_person))
    setNewName('')
  }

  const handleFormNameChange = (event) => {
      setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddName}>
        <div>
          name: <input value={newName} onChange={handleFormNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhonebookNames persons={persons}/>
    </div>
  )
}

export default App