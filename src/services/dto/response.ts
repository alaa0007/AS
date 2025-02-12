
export type ResponseDto ={
  pokemons: Pokemon[],
  nextOffset: number | null
}

export type Pokemon = {
  name: string;
  image?: string
  stats?: { name: string; value: number }[];
  types?: string[];
}
