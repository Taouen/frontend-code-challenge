import React, { useState } from 'react';
import './App.css';
import Entry from './components/Entry';

const URL_PATH =
  'https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [pokemon, setPokemon] = useState([]);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(URL_PATH);
    setLoading(false);
    data
      .json()
      .then((info) => {
        setPokemon(info);
      })
      .catch(console.error);
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    console.log(value);
  };

  /* const getPokemon = () => {
    console.log(value);
    const filteredResults = results.filter((pokemon) => {
      pokemon.Name.startsWith(value);
      console.log(pokemon.Name, value);
    });
  };
 */
  return (
    <>
      <label htmlFor="maxCP" className="max-cp">
        <input type="checkbox" id="maxCP" />
        <small>Maximum Combat Points</small>
      </label>
      <input
        type="text"
        className="input"
        placeholder="Pokemon or type"
        value={value}
        onChange={() => handleChange()}
        // onInput={() => getData()}
      />
      {loading && <div className="loader"></div>}
      <ul className="suggestions">
        {/*
          map over the first 4 filtered suggestions, return:

          <Entry
            Name={pokemon.Name}
            types={pokemon.types}
            number={pokemon.number}
          />
        */}
        <li>
          <img
            src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png"
            alt=""
          />
          <div className="info">
            <h1 className="no-results">No results</h1>
          </div>
        </li>
      </ul>
    </>
  );
};
export default App;
