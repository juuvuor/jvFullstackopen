import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notifications from './components/Notification'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import DisplayPerson from './components/DisplayPerson'




const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNames, setFilter] = useState('')
  const [operationMessage, setOperationMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        //console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')


  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const isInTheList = (persons) => persons.name === newName;

    if (persons.findIndex(isInTheList) > -1) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setOperationMessage(
            `Added ${newName} `
          )
          setTimeout(() => {
            setOperationMessage(null)
          }, 2000)
        }).catch(error => {
          setOperationMessage(
            `${error.response.data} `
          )
          setTimeout(() => {
            setOperationMessage(null)
          }, 2000)
           console.log(`frontin errori; ${error.response.data}`)
        })
      }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

//kokeilu sekä väliaikainen ratkaisu
  const filteredPersons = persons.filter(person => {
    if (person.name !== undefined) {
      return person.name.toLowerCase().includes(filterNames.toLowerCase())
    }
    return false
  });
  

  const personDelete = (id) => {
    // console.log(`nähdään id ${id} ja se voidaan nyt poistaa`)

    const person = persons.find(n => n.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setOperationMessage(
            `Deleted ${person.name} `
          )
          setTimeout(() => {
            setOperationMessage(null)
          }, 2000)
        } )
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={operationMessage} />
      <Filter value={filterNames} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>{
        filteredPersons.map(person =>
          <DisplayPerson
            key={person.name}
            person={person}
            personDelete={() => personDelete(person.id)} />)}
    </div>
  )
}

export default App