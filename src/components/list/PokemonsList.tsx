import React from 'react';
import { Pokemon } from '../../services/dto/response';
import usePokemonContext from '../../hooks/usePokemonContext';
import PokemonDetails from './PokemonDetails';
import SearchInput from '../inputs/SearchInput';
import { sortOptions, typeOptions } from '../../common/constants/selectList';
import Select from '../inputs/Select';
import Spinner from '../loading/Spinner';


/**
 * A functional component that renders a list of pokemon.
 * 
 * @param {{ pokemons: Pokemon[] }} props
 * @prop {Pokemon[]} pokemons A list of pokemon objects.
 * 
 * @returns A JSX element representing the list of pokemon.
 * 
*/
const PokemonsList: React.FC<{loadingNextPokemons: boolean}> = ({loadingNextPokemons}: {loadingNextPokemons: boolean}) => {
  const { paginatedPokemons, filterByType, sortPokemons, searchAttackPokemons, searchPokemons} = usePokemonContext();

  //RENDER
  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Barre de recherche */}

      <div className="flex gap-4 mb-4">
      <SearchInput 
        placeholder='Search by name...'
        className="border rounded-lg p-2 flex-1"
        onChange={searchPokemons}
      />
      <SearchInput 
        placeholder='Filter by attack power...'
        className="border rounded-lg p-2 flex-1"
        type="number" 
        onChange={searchAttackPokemons}
      />
      </div>

      <div className="flex gap-4 mb-4">
        {/* Filtrage par type */}
        <Select
          options={typeOptions}
          onChange={filterByType}
          defaultValue=""
          className="border rounded-lg p-2 flex-1"
        />

        {/* Tri */}
        <Select
          options={sortOptions}
          onChange={sortPokemons}
          defaultValue="name"
          className="border rounded-lg p-2 flex-1"
        />
      </div>
      {
        paginatedPokemons.length === 0 ? (
          <div className="w-full text-center">
            <p className="text-gray-500">No Pokemons found for this filter in this page</p>
          </div>
        ) : null
      }

      {
        loadingNextPokemons ? 
          <Spinner />
        :
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {
              paginatedPokemons?.map((pokemon: Pokemon) => (
                <li key={pokemon.name} className="flex justify-center">
                  <PokemonDetails pokemon={pokemon} />
                </li>
                ))
            }
          </ul>
      }
    </div>
  )
}

//EXPORT
export default PokemonsList;
