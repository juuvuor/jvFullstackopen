const DisplayCountry = ({ country, countryDelete }) => {
  //console.log('note sisältää: ', country)
  
  return (
    <div>
      <h1> {country.name.common} </h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>

      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.name.common} />

    </div>
    
  );
};
export default DisplayCountry;
