import { createContext, useState, useEffect, ReactNode } from "react";
import { Pokemon } from "../services/dto/response";

interface PokemonsContextType {
  paginatedPokemons: Pokemon[];
  setPokemons: (data: Pokemon[]) => void;
  searchPokemons: (query: string|number) => void;
  searchAttackPokemons: (query: number|string) => void;
  filterByType: (type: string) => void;
  sortPokemons: (stat?: string) => void;
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
  totalPages: number;
}

export const PokemonsContext = createContext<PokemonsContextType | undefined>(undefined);

/**
 * A context provider component that manages the state and behavior of Pokémon data.
 * 
 * It provides functionalities to set, filter, sort, and paginate the list of Pokémon.
 * The component uses React's context API to supply the Pokémon-related state and 
 * functions to its children.
 * 
 * @param {{ children: ReactNode }} props The children components that require access
 * to the Pokémon context.
 * 
 * @returns {JSX.Element} A provider component that wraps its children with the Pokémon context.
 * 
 * The context includes:
 * - `paginatedPokemons`: The currently visible paginated list of Pokémon.
 * - `setPokemons`: A function to set the list of Pokémon.
 * - `searchPokemons`: A function to filter Pokémon by name.
 * - `searchAttackPokemons`: A function to filter Pokémon by attack value.
 * - `filterByType`: A function to filter Pokémon by type.
 * - `sortPokemons`: A function to sort Pokémon by a specified stat.
 * - `nextPage`: A function to navigate to the next page of Pokémon.
 * - `prevPage`: A function to navigate to the previous page of Pokémon.
 * - `currentPage`: The current page number in the pagination.
 * - `totalPages`: The total number of pages available based on the paginated data.
*/
export const PokemonsProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [pokemons, setPokemonsState] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  const [searchQuery, setSearchQuery] = useState<string|number>("");
  const [searchAttackQuery, setSearchAttackQuery] = useState<number|string>(0);
  const [selectedType, setSelectedType] = useState<string>("");
  const [sortStat, setSortStat] = useState<string>("name");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 21;

  // Met à jour la liste des Pokémon
  const setPokemons = (data: Pokemon[]) => {
    setPokemonsState(data);
    setCurrentPage(1);
  };

  // Applique les filtres et le tri
  useEffect(() => {
    let result = [...pokemons];

    if (searchQuery) {
      result = result.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toString().toLowerCase())
      );
    }

    if (selectedType) {
      result = result.filter((pokemon) => pokemon.types?.includes(selectedType));
    }

    if(searchAttackQuery) {
      result = result.filter((pokemon) => {
        const attackStat = pokemon.stats?.find((s) => s.name.toLowerCase() === "attack")?.value ?? 0;
        return attackStat >= +searchAttackQuery;
      })
    }

    result.sort((a, b) => {
      if (sortStat === "name") return a.name.localeCompare(b.name);
      const statA = a.stats?.find((s) => s.name.toLowerCase() === sortStat)?.value ?? 0;
      const statB = b.stats?.find((s) => s.name.toLowerCase() === sortStat)?.value ?? 0;
      return statB - statA;
    });

    setFilteredPokemons(result);
    setCurrentPage(1);
  }, [pokemons, searchQuery, selectedType, sortStat, searchAttackQuery]);

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const paginatedPokemons = filteredPokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /**
   * Navigates to the next page of the paginated list of pokemons.
   * It increments the current page number if it's not already on the last page.
  */
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  /**
   * Navigates to the previous page of the paginated list of pokemons.
   * It decrements the current page number if it's not already on the first page.
  */
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Définit la recherche
  const searchPokemons = (query: string|number) => {
    setSearchQuery(query);
  };

  const searchAttackPokemons = (query: number|string) => {
    setSearchAttackQuery(query);
  };

  // Définit le type sélectionné
  const filterByType = (type: string) => {
    setSelectedType(type);
  };

  // Définit le critère de tri
  const sortPokemons = (stat: string = "name") => {
    setSortStat(stat);
  };

  //RENDER
  return (
    <PokemonsContext.Provider
      value={{
        paginatedPokemons,
        setPokemons,
        searchPokemons,
        searchAttackPokemons,
        filterByType,
        sortPokemons,
        nextPage,
        prevPage,
        currentPage,
        totalPages,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
};
