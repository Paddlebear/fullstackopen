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

export default PersonForm