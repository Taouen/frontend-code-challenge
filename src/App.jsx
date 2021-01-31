import React, { useState, useEffect } from 'react';
import './App.css';
import Entry from './components/Entry';

const URL_PATH =
  'https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [maxCP, setMaxCP] = useState(false);

  const getData = async () => {
    setLoading(true);
    const response = await fetch(URL_PATH);
    setLoading(false);
    response
      .json()
      .then((data) => {
        data.sort((a, b) => {
          if (!a.MaxCP) {
            a.MaxCP = '';
          }
          if (!b.MaxCP) {
            b.MaxCP = '';
          }
          if (maxCP) {
            return a.MaxCP > b.MaxCP ? -1 : 1;
          } else {
            return a.Name > b.Name ? 1 : -1;
          }
        });
        setPokemon(data);
      })
      .catch();
  };

  const sortByMaxCP = () => {
    setMaxCP(!maxCP);
    const sortedPokemon = [...pokemon];
    sortedPokemon.sort((a, b) => {
      if (maxCP) {
        return a.Name > b.Name ? 1 : -1;
      } else {
        return a.MaxCP > b.MaxCP ? -1 : 1;
      }
    });
    setPokemon(sortedPokemon);
  };

  useEffect(() => {
    const filteredByName = pokemon.filter((pokemon) => {
      const name = pokemon.Name.toLowerCase();
      return name.startsWith(value.toLowerCase());
    });
    const filteredByType = pokemon.filter((pokemon) => {
      const types = pokemon.Types.map((type) => type.toLowerCase());
      return types.some((type) => type.startsWith(value.toLowerCase()));
    });
    const filteredResults = [...filteredByName, ...filteredByType];
    setResults(filteredResults.slice(0, 4));
  }, [pokemon, value]);

  return (
    <>
      <label htmlFor="maxCP" className="max-cp">
        <input type="checkbox" id="maxCP" onChange={() => sortByMaxCP()} />
        <small>Maximum Combat Points</small>
      </label>
      <input
        type="text"
        className="input"
        placeholder="Pokemon or type"
        value={value}
        onChange={(event) => {
          getData();
          setValue(event.target.value);
        }}
      />
      {loading && <div className="loader"></div>}
      <ul className="suggestions">
        {results.map((pokemon, index) => {
          const { Name, Number, Types } = pokemon;
          return (
            <Entry
              name={Name}
              number={Number}
              types={Types}
              key={index}
              value={value}
            />
          );
        })}

        {results.length === 0 && (
          <li>
            <img
              src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png"
              alt=""
            />
            <div className="info">
              <h1 className="no-results">No results</h1>
            </div>
          </li>
        )}
      </ul>
    </>
  );
};

export default App;
