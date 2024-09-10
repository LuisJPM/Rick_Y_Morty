import { useState, useEffect } from 'react';
import { fetchCharacters, fetchAllCharacters } from '../services/api';

export const useCharacters = (page, query, selectedSpecies) => {
  const [characters, setCharacters] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [species, setSpecies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const allChars = await fetchAllCharacters();
        setAllCharacters(allChars);


        const speciesSet = new Set(allChars.map(char => char.species));
        setSpecies([...speciesSet]);

        const data = await fetchCharacters(page);
        const { results, info } = data;
        setCharacters(results);
        setTotalPages(info.pages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    let filtered = allCharacters;

    if (query) {
      filtered = filtered.filter(character =>
        character.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedSpecies) {
      filtered = filtered.filter(character => character.species === selectedSpecies);
    }

    const startIndex = (page - 1) * 20; 
    const endIndex = startIndex + 20;
    setCharacters(filtered.slice(startIndex, endIndex));
  }, [query, selectedSpecies, allCharacters, page]);

  return { characters, species, totalPages };
};
