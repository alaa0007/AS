import React from 'react';
import { Pokemon } from '../../services/dto/response';
import usePokemonContext from '../../hooks/usePokemonContext';
import PokemonDetails from './PokemonDetails';


/**
 * A functional component that renders a list of pokemon.
 * 
 * @param {{ pokemons: Pokemon[] }} props
 * @prop {Pokemon[]} pokemons A list of pokemon objects.
 * 
 * @returns A JSX element representing the list of pokemon.
 * 
*/
const PokemonsList: React.FC= () => {
  const { paginatedPokemons, searchPokemons, filterByType, sortPokemons } = usePokemonContext();

  //RENDER
  return (
      <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          onChange={(e) => searchPokemons(e.target.value)}
          className="border rounded-lg p-2 flex-1"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <select
          onChange={(e) => filterByType(e.target.value)}
          className="border rounded-lg p-2 flex-1"
        >
          <option value="">All Types</option>
          {["Fire", "Water", "Grass", "Electric", "Psychic", "Rock", "Ground", "Flying"].map(
            (type) => (
              <option key={type} value={type.toLowerCase()}>
                {type}
              </option>
            )
          )}
        </select>

        <select
          onChange={(e) => sortPokemons(e.target.value)}
          className="border rounded-lg p-2 flex-1"
        >
          <option value="name">Sort by Name</option>
          <option value="attack">Sort by Attack</option>
          <option value="hp">Sort by HP</option>
          <option value="speed">Sort by Speed</option>
        </select>
      </div>
      {
        paginatedPokemons.length === 0 ? (
          <div className="w-full text-center">
            <p className="text-gray-500">No Pokemons found for this filter in this page</p>
          </div>
        ) : null
      }

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {
          paginatedPokemons?.map((pokemon: Pokemon) => (
            <li key={pokemon.name} className="flex justify-center">
              <PokemonDetails pokemon={pokemon} />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

//EXPORT
export default PokemonsList;
