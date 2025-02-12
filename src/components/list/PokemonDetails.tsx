import { typeColors } from "../../common/constants/typesColor";
import { Pokemon } from "../../services/dto/response";

/**
 * A React component that displays a Pokémon's details.
 *
 * @param {{ name: string }} props The Pokémon's name.
 * @returns {JSX.Element} A JSX element representing the Pokémon's details.
 *
 * The component fetches the Pokémon's data using the {@link usePokemonDetails} hook.
 * If the data is loading, it displays a "Loading..." message.
 * If the data is not found, it displays a "Pokémon not found." message.
 * Otherwise, it displays the Pokémon's name, sprite, types, and stats.
*/
const PokemonDetails: React.FC<{pokemon: Pokemon}> = ({pokemon}: {pokemon: Pokemon}): JSX.Element => {

  //RENDER
  return (
    <div className="mt-6 bg-white rounded-xl shadow-lg p-6 text-center max-w-md mx-auto hover:shadow-2xl transition duration-300">
      <h2 className="text-3xl font-bold text-gray-800">{pokemon.name.toUpperCase()}</h2>

      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="mx-auto w-32 h-32 my-4"
      />

      {/* Types sous forme de boutons colorés */}
      <div className="flex justify-center space-x-2 my-3">
        {pokemon.types?.map((t) => (
          <span
            key={t}
            className={`px-3 py-1 text-white text-sm font-semibold rounded-full ${typeColors[t] || "bg-gray-500"}`}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-700">Stats</h3>
        <ul className="mt-3 grid grid-cols-3 gap-2">
          {pokemon.stats?.map((stat) => (
            <li key={stat.name} className="flex flex-col items-center bg-gray-100 p-2 rounded-lg">
              <span className="capitalize font-medium text-gray-600">{stat.name}</span>
              <span className="font-semibold text-gray-800">{stat.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

//EXPORT
export default PokemonDetails;
