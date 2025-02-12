import React from "react";

type PaginationProps = {
  isNext: boolean;
  isPrevious: boolean;
  nextPokemonList: () => void;
  previousPokemonList: () => void;
};

/**
 * Pagination component for navigating through pages of Pokémon lists.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.isNext - Indicates if the next page is available.
 * @param {boolean} props.isPrevious - Indicates if the previous page is available.
 * @param {Function} props.nextPokemonList - Function to navigate to the next page.
 * @param {Function} props.previousPokemonList - Function to navigate to the previous page.
 *
 * @returns {JSX.Element} A JSX element containing "Previous" and "Next" buttons for pagination.
 * The buttons are styled and disabled based on the availability of the next or previous pages.
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
