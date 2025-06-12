import Country from "./Country"

const Countries = ({ countries, handleShow, handleBack }) => {

    if (countries.length > 10) {
        return (
            <div>
                <p>too many matches, specify another filter</p>
            </div>
        )
    }

    else if (countries.length === 1) {
        return (
            <div>
                <Country country={countries[0]} handleBack={handleBack}/>
            </div>
        )
    }


    return (
        <div>
            {countries.map(country =>
                <p key={country.cca2}>{country.name.common}
                    <button onClick={event => handleShow(event, country)}>Show</button></p>
            )}
        </div>
    )

}

export default Countries