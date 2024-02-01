const DisplayPerson = ({ person, personDelete }) => {
    //console.log('note sisältää: ', person)
    return (
      <div>
        <p> {person.name} {person.number} <button onClick={personDelete} >delete</button></p>
      </div>
  
    )
  }
export default DisplayPerson  