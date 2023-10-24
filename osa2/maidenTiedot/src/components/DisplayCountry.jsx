const DisplayCountry = ({ country, countryDelete }) => {
  //console.log('note sisältää: ', country)
  return (
    <div>
      <h1> {country.name.common} </h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      
        <ul>
 
          {country.languages.map((language) => (
          <li>
          {language}
          </li>
          ))}
          
        </ul>
      
          
    </div>

  )
}
export default DisplayCountry  