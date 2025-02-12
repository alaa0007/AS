import { createContext, useState, useEffect, ReactNode } from "react";
import { Pokemon } from "../services/dto/response";

interface PokemonsContextType {
  filteredPokemons: Pokemon[];
  setPokemons: (data: Pokemon[]) => void;
  searchPokemons: (query: string) => void;
  filterByType: (type: string) => void;
  sortPokemons: (stat?: string) => void;
  length: number;
}

export const PokemonsContext = createContext<PokemonsContextType | undefined>(undefined);

export const PokemonsProvider = ({ children }: { children: ReactNode }) => {
  const [pokemons, setPokemonsState] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [sortStat, setSortStat] = useState<string>("name");

  // Met à jour pokemons + reset tous les filtres
  const setPokemons = (data: Pokemon[]) => {
    setPokemonsState(data);
  };

  // Applique les filtres chaque fois qu'un critère change
  useEffect(() => {
    let result = [...pokemons];

    // 1️⃣ Filtrer par recherche
    if (searchQuery) {
      result = result.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2️⃣ Filtrer par type
    if (selectedType) {
      result = result.filter((pokemon) => pokemon.types?.includes(selectedType));
    }

    // 3️⃣ Trier par stats
    result.sort((a, b) => {
      if (sortStat === "name") return a.name.localeCompare(b.name);
      const statA = a.stats?.find((s) => s.name.toLowerCase() === sortStat)?.value ?? 0;
      const statB = b.stats?.find((s) => s.name.toLowerCase() === sortStat)?.value ?? 0;
      return statB - statA;
    });

    setFilteredPokemons(result);
  }, [pokemons, searchQuery, selectedType, sortStat]);

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

  return (
    <PokemonsContext.Provider
      value={{
        filteredPokemons,
        setPokemons,
        searchPokemons,
        filterByType,
        sortPokemons,
        length: filteredPokemons.length
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
};
