import React from 'react';

const Entry = ({ Name, number, types }) => {
  return (
    <li>
      <img
        src={`http://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`}
        alt=""
      />
      <div className="info">
        <h1>
          <span className="hl">{Name}</span>
        </h1>
        {types.forEach((type) => {
          return <span className={`type ${type.toLowerCase()}`}>{type}</span>;
        })}
      </div>
    </li>
  );
};

export default Entry;
