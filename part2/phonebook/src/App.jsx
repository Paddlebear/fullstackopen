import { useState } from 'react'

const Filter = ({ newSearch, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={newSearch} onChange={handleFilter} />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, handleAddName, handleNewName, handleNewNumber }) => {
  return (
    <div>
      <form onSubmit={handleAddName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAddName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const alreadyExists = persons.some(person => person.name === newName)
    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilter = (event) => {
    setNewSearch(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleAddName={handleAddName} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App