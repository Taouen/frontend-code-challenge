import React from 'react';

const Entry = ({ name, number, types }) => {
  return (
    <li>
      <img
        src={`http://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`}
        alt=""
      />
      <div className="info">
        <h1>
          <span className="hl">{name}</span>
        </h1>
        {types.map((type, index) => {
          return (
            <span key={index} className={`type ${type.toLowerCase()}`}>
              {type}
            </span>
          );
        })}
      </div>
    </li>
  );
};

export default Entry;
