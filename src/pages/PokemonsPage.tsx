import React, { useEffect, useState } from 'react';
import pokemonsService from '../services/pokemonServices';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import usePokemonContext from '../hooks/usePokemonContext';
import PokemonsList from '../components/list/PokemonsList';
import Pagination from '../components/list/Pagination';


const LIMIT=21;

/**
 * The PokemonsPage is a React component that displays a paginated list of Pokemon.
 * 
 * It uses the useQuery hook from @tanstack/react-query to fetch the list of Pokemon
 * from the Pokemon API. The component also implements a pagination feature to
 * navigate to the next and previous pages.
 * 
 * If the data is loading, the component displays a "Loading..." message.
 * If there is an error loading the data, the component displays an "Error loading data" message.
 * 
 * The component also uses the usePokemonContext hook to store the list of Pokemon in the context.
 * 
 * The component renders a list of Pokemon, a div with the title "Pokémon List (Page X)" and a Pagination component.
 * The Pagination component is used to navigate to the next and previous pages.
 * 
 * The component implements the following features:
 * - Fetches the list of Pokemon from the Pokemon API.
 * - Implements pagination to navigate to the next and previous pages.
 * - Displays a "Loading..." message while the data is loading.
 * - Displays an "Error loading data" message if there is an error loading the data.
 * - Stores the list of Pokemon in the context using the usePokemonContext hook.
*/
const PokemonsPage: React.FC = () => {
  //HOOKS
  const [offset, setOffset] = useState(0);
  const { setPokemons } = usePokemonContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemons", offset],
    queryFn: () => pokemonsService.getAllPokemons(offset, LIMIT),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
  
  useEffect(() => {
    if (data?.pokemons) {
      setPokemons(data.pokemons);
    }
  }, [data, setPokemons]);

  /**
   * Navigates to the next page if `nextOffset` is available.
  */
  const nextPokemonList = () => {
    if (data && data?.nextOffset !== null) {
      setOffset(data.nextOffset);
    }
  };

  /**
   * Navigates to the previous page.
  */
  const previousPokemonList = () => {
    setOffset((prev) => Math.max(prev - LIMIT, 0));
  };

  //RENDER
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}

      <div className="bg-gradient-to-r from-gray-500 to-dark-600 py-4 shadow-md">
        <h1 className="text-3xl font-bold text-white text-center">
          Pokémon List 🚀
        </h1>
      </div>

      <div>
        <PokemonsList />
      </div>

      <Pagination 
        previousPokemonList={previousPokemonList} 
        nextPokemonList={nextPokemonList} 
        isPrevious={offset === 0} 
        isNext={data?.nextOffset == null} 
      />
    </div>
  );
};

//EXPORT
export default PokemonsPage;
