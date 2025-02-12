import React from 'react'

/**
 * A React component that renders a header with a Pokémon List title.
 *
 * It renders a div with a gradient background and a h1 with a bold, white,
 * 3xl font-size text centered in the middle with a shadow.
 *
 * @returns {JSX.Element} The rendered header component.
*/
const Header: React.FC = (): JSX.Element => {
  //RENDER
  return (
    <div className="bg-gradient-to-r from-gray-500 to-dark-600 py-4 shadow-md">
      <h1 className="text-3xl font-bold text-white text-center">
        Pokémon List 🚀
      </h1>
    </div>
  )
}

//EXPORT
export default Header;
