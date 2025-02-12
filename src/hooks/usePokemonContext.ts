import { useContext } from "react"
import { PokemonsContext } from "../context/Pokemons";


/**
 * Hook to access the pokemon context.
 *
 * It throws an error if the hook is not used within a PokemonProvider.
 *
 * @returns The pokemon context.
*/
const usePokemonContext = () => {
  const pokemon = useContext(PokemonsContext);

  if(!pokemon) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }


  return pokemon;
}

//EXPORT
export default usePokemonContext;
