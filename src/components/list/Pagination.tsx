import React from "react";

type PaginationProps = {
  isNext: boolean;
  isPrevious: boolean;
  nextPokemonList: () => void;
  previousPokemonList: () => void;
};

/**
 * A React component that renders a pagination component.
 *
 * @param {{ isNext: boolean; isPrevious: boolean; nextPokemonList: () => void; previousPokemonList: () => void; }}
 *   props A props object containing the following properties:
 *     - isNext: A boolean indicating whether the "Next" button should be disabled.
 *     - isPrevious: A boolean indicating whether the "Previous" button should be disabled.
 *     - nextPokemonList: A function to call when the "Next" button is clicked.
 *     - previousPokemonList: A function to call when the "Previous" button is clicked.
 *
 * @returns A JSX element representing the pagination component.
 *
 * The component renders two buttons, "Previous" and "Next", with the specified properties.
 * The "Previous" button is disabled if `isPrevious` is true, and the "Next" button is disabled if
 * `isNext` is true. The component also styles the buttons with a blue color scheme.
*/
const Pagination: React.FC<PaginationProps> = ({ isNext, isPrevious, nextPokemonList, previousPokemonList }) => {
  //RENDER
  return (
    <div className="flex justify-center gap-4 my-6">
      <button
        onClick={previousPokemonList}
        disabled={isPrevious}
        className={`px-5 py-2 rounded-lg text-white font-semibold transition duration-300 ${
          isPrevious ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
        }`}
      >
        Previous
      </button>
      <button
        onClick={nextPokemonList}
        disabled={isNext}
        className={`px-5 py-2 rounded-lg text-white font-semibold transition duration-300 ${
          isNext ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
        }`}
      >
        Next
      </button>
    </div>
  );
};

//EXPORT
export default Pagination;
