import React from 'react';

const CharacterCard = ({ character }) => {
  return (
    <div className="character-card">
      <h2>Personaje:</h2>
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <h4>Raza:</h4>
      <p>{character.species}</p>
      <h4>Genero y/o caracteristicas:</h4>
      <p>{character.gender}</p>
      <p>{character.type}</p>
      <h4>Estado de vida:</h4>
      <p>{character.status}</p>
    </div>
  );
};

export default CharacterCard;
