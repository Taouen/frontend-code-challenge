import React from 'react';

const Entry = ({ name, types, number, value }) => {
  let title = <h1>{name}</h1>;
  if (name.toLowerCase().startsWith(value.toLowerCase())) {
    title = (
      <h1>
        <span className="hl">{name.slice(0, value.length)}</span>
        {name.substring(value.length)}
      </h1>
    );
  }

  return (
    <li>
      <img
        src={`http://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`}
        alt=""
      />
      <div className="info">
        {title}
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
