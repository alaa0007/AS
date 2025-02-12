import { createContext, useState, useEffect, ReactNode } from "react";
import { Pokemon } from "../services/dto/response";

interface PokemonsContextType {
  paginatedPokemons: Pokemon[];
  setPokemons: (data: Pokemon[]) => void;
  searchPokemons: (query: string) => void;
  filterByType: (type: string) => void;
  sortPokemons: (stat?: string) => void;
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
  totalPages: number;
}

export const PokemonsContext = createContext<PokemonsContextType | undefined>(undefined);

export const PokemonsProvider = ({ children }: { children: ReactNode }) => {
  const [pokemons, setPokemonsState] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
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
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType) {
      result = result.filter((pokemon) => pokemon.types?.includes(selectedType));
    }

    result.sort((a, b) => {
      if (sortStat === "name") return a.name.localeCompare(b.name);
      const statA = a.stats?.find((s) => s.name.toLowerCase() === sortStat)?.value ?? 0;
      const statB = b.stats?.find((s) => s.name.toLowerCase() === sortStat)?.value ?? 0;
      return statB - statA;
    });

    setFilteredPokemons(result);
    setCurrentPage(1);
  }, [pokemons, searchQuery, selectedType, sortStat]);

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
  const searchPokemons = (query: string) => {
    setSearchQuery(query);
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
