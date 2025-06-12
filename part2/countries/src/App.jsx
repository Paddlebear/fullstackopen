import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'
import Country from './components/Country'
import Filter from './components/Filter'

const App = () => {

    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
        console.log('effect')
        countryService.getAll().then(initialCountries => {
            setCountries(initialCountries)
        })
    }, [])

    const handleFilter = (event) => {
        setSearch(event.target.value)
    }

    const handleShow = (event, country) => {
        event.preventDefault()
        setSelectedCountry(country)
    }

    const handleBack = (event) => {
        event.preventDefault()
        setSelectedCountry(null)
        setSearch('')
    }

    const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(search))

    return (
        <div>
            <Filter search={search} handleFilter={handleFilter} />
            {selectedCountry
                ? <Country country={selectedCountry} handleBack={handleBack}/>
                : <Countries countries={countriesToShow} handleShow={handleShow} handleBack={handleBack} />
            }
        </div>
    )

}

export default App