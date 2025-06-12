const Filter = ({ search, handleFilter }) => {
  return (
    <div>
      find countries <input value={search} onChange={handleFilter} />
    </div>
  )
}

export default Filter