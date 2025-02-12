import React from 'react'
import usePokemonContext from '../../hooks/usePokemonContext';

/**
 * A functional component that renders an input field to search for
 * Pokémon by name. When the user types in the input field, the
 * `searchPokemons` function from the `usePokemonContext` hook is called
 * with the search query as an argument.
 *
 * @returns A JSX element representing the search input field.
 */
const SearchInput: React.FC = () => {

  //HOOKS
  const { searchPokemons }= usePokemonContext();

  //RENDER
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Search Pokémon..."
        onChange={(e) => searchPokemons(e.target.value)}
        className="border rounded-lg p-2 flex-1"
      />
  </div>
  )
}

//EXPORT
export default SearchInput
