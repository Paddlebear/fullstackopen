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

export default Persons