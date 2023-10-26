import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App";

axios
  .get("https://studies.cs.helsinki.fi/restcountries/api/all")
  .then((response) => {
    const countries = response.data;
    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
  });
