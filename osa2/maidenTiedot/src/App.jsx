import { useState } from 'react'




const App = () => {

  const [countries, setCountries] = useState([])
  return (
    <div>
          find countries: <input value={''} />
    </div>
  )
}

export default App