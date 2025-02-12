import React, { useEffect, useState } from 'react';
import pokemonsService from '../services/pokemonServices';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import usePokemonContext from '../hooks/usePokemonContext';
import PokemonsList from '../components/list/PokemonsList';
import Pagination from '../components/list/Pagination';

const LIMIT = 21;

/**
 * The PokemonsPage component fetches the list of pokemons from the API,
 * and displays it using the PokemonsList component. It also renders a
 * Pagination component to navigate between pages. The component uses
 * the usePokemonContext hook to access the pokemon context, and the
 * useQuery hook to fetch the pokemon data from the API. The data is
 * cached for 5 minutes to avoid unnecessary requests.
 *
 * @returns A JSX element representing the PokemonsPage component.
*/
const PokemonsPage: React.FC = () => {
  //HOOKS
  const [offset, setOffset] = useState(0);
  const { setPokemons, nextPage, prevPage, currentPage, totalPages } = usePokemonContext();

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
   * Function to handle the click event on the "Next" button.
   * If there are more pages available, it calls the nextPage
   * function to update the context. Otherwise, it updates the
   * offset to fetch the next page from the API.
  */
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      nextPage();
    } else {
      setOffset((prev) => prev + LIMIT);
    }
  };

  /**
   * Handles the click event on the "Previous" button.
   * If there are previous pages available in the context,
   * it calls the prevPage function to update the context.
   * Otherwise, it updates the offset to fetch the previous 
   * page from the API, ensuring the offset does not go below zero.
  */
  const handlePrevPage = () => {
    if (currentPage > 1) {

      prevPage();
    } else {
      setOffset((prev) => Math.max(prev - LIMIT, 0));
    }
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
        previousPokemonList={handlePrevPage}
        nextPokemonList={handleNextPage}
        isPrevious={offset === 0 && currentPage === 1}
        isNext={!(data?.pokemons.length === LIMIT) && currentPage === totalPages}
      />
    </div>
  );
};

//EXPORT
export default PokemonsPage;