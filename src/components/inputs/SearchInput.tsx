import React from 'react'

interface InputProps {
  onChange:  (value: string | number) => void;
  className?: string;
  placeholder?: string;
  isNumber?: boolean
}

/**
 * A functional component that renders an input field to search for
 * Pokémon by name. When the user types in the input field, the
 * `searchPokemons` function from the `usePokemonContext` hook is called
 * with the search query as an argument.
 *
 * @returns A JSX element representing the search input field.
 */
const SearchInput: React.FC<InputProps>= ({onChange, className, placeholder, isNumber}) => {

  //RENDER
  return (
    <input
      type={isNumber ? "number" : "text"}
      placeholder={placeholder ?? "Search..."}
      onChange={(e) => {
        const value: string | number = isNumber ? Number(e.target.value) || 0 : e.target.value;
        onChange(value);
      }}
      className={className ?? "border rounded-lg p-2 flex-1"}
    />
  )
}

//EXPORT
export default SearchInput
