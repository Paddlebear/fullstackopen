import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

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

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(person =>
        <p key={person.name}>{person.name} {person.number}
          <button onClick={event => handleDelete(event, person.name)}>delete</button>
        </p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState('good')

  useEffect(() => {
    console.log('effect')
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  //console.log('render', persons.length, 'person data')

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
      const personToUpdate = persons.find((person) => person.name === newName)
      const idToUpdate = personToUpdate.id
      console.log(`updating person with id ${idToUpdate}`)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(idToUpdate, personObject).then(() => {
          personService.getAll().then(updatedPersons => {
            setPersons(updatedPersons)
            setNotificationStyle('good')
            setErrorMessage(`Updated ${newName}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
        }).catch(error => {
          setNotificationStyle('bad')
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== idToUpdate))
          setNewName('')
          setNewNumber('')
        })
        console.log(`updated person with id ${idToUpdate}`);
      } else {
        console.log('updating canceled');
      }
    }
    else {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationStyle('good')
        setErrorMessage(`Added ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleDelete = (event, name) => {
    event.preventDefault()
    const personToDelete = persons.find((person) => person.name === name)
    const idToDelete = personToDelete.id
    console.log(`deleting ${name}`)
    if (window.confirm(`Delete ${name}?`)) {
      console.log(`deleting person with id ${idToDelete}`);
      personService.remove(idToDelete).then(() => {
        setPersons(persons.filter(person => person.id !== idToDelete))
        setNotificationStyle('good')
        setErrorMessage(`Deleted ${personToDelete.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }).catch(error => {
        setNotificationStyle('bad')
        setErrorMessage(`Information of ${name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== idToDelete))
        setNewName('')
        setNewNumber('')
      })
      console.log(`deleted person with id ${idToDelete}`);

    } else {
      console.log('deleting canceled');
    }
  }

  const handleFilter = (event) => {
    setNewSearch(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} notificationStyle={notificationStyle} />
      <Filter newSearch={newSearch} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleAddName={handleAddName} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App