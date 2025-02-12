import axios from "axios";
import { httpConfig } from "./config/httpConfig";
import POKEMONS_ENDPOINTS from "./constant/pokemonsAPI";
import { Pokemon, ResponseDto } from "./dto/response";


/**
 * Récupère la liste des Pokémon paginée.
 *
 * @param {number} [offset=0] - Offset de la pagination.
 * @param {number} [limit=20] - Nombre de Pokémon à récupérer.
 * @returns {Promise<ResponseDto>} - Une promesse qui résout avec un objet
 *          contenant la liste des Pokémon et l'offset de la prochaine page.
*/
const getAllPokemons = async (offset: number = 0, limit: number = 21): Promise<ResponseDto> => {
  try {
    const response = await axios.get(`${httpConfig.BASE_URL}${POKEMONS_ENDPOINTS.GET_ALL_POKEMONS}?offset=${offset}&limit=${limit}`);
    const results = response.data.results;

    // Récupérer les détails de chaque Pokémon en parallèle
    const pokemons: Pokemon[] = await Promise.all(
      results.map(async (pokemon: { name: string; url: string }) => {
        const details = await axios.get(pokemon.url);
        return {
          name: details.data.name,
          image: details.data.sprites.front_default,
          stats: details.data.stats.map((stat: { base_stat: number; stat: { name: string; }; }) => ({
            name: stat.stat.name,
            value: stat.base_stat
          })),
          types: details.data.types.map((t: { type: { name: string; }; }) => t.type.name)
        };
      })
    );
    
    return { pokemons, nextOffset: response.data.next ? offset + limit : null};
  } catch (error) {
    console.error("Error fetching all Pokémon:", error);
    throw error;
  }
};



//ENDPOINTS
const pokemonsService = {
  getAllPokemons,
}

//EXPORT
export default pokemonsService;