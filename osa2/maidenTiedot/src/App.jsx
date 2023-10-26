import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/FilterCountries";
import DisplayCountry from "./components/DisplayCountry";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilter] = useState("");
  useEffect(() => {
    console.log("effect");
    // tässä haetaan siis data APIsta ja tallennetaan se muuttuujaan countries
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        console.log("promise fulfilled");
        setCountries(response.data);
      });
  }, []);
  console.log("render", countries.length, "notes");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  //kokeilu sekä väliaikainen ratkaisu
  const filteredCountries = countries.filter((country) => {
    if (country.name.common !== undefined) {
      return country.name.common
        .toLowerCase()
        .includes(filterCountries.toLowerCase());
    }
    return false;
  });
  return (

    <div>
      <Filter value={filterCountries} onChange={handleFilterChange} />
      {filteredCountries.length === 1 ? (
        <DisplayCountry country={filteredCountries[0]} />
      ) : filteredCountries.length <= 10 ? (
        filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
          </div>
        ))
      ) : (
        <div>Please narrow down your search.</div>
      )}
    </div>
  );
};

export default App;
