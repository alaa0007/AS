import React from 'react'

/**
 * A functional component that renders a footer with a copyright notice.
 *
 * @returns {JSX.Element} A JSX element representing the footer, which is a
 * blue-gray gradient container with a centered white copyright notice.
 */
const Footer: React.FC = (): JSX.Element => {
  return (
    <div className="bg-gradient-to-r from-dark-600 to-gray-500 py-4 shadow-md">
      <p className="text-center text-gray-500">
        &copy; 2025 Alaa bouassida. All rights reserved.
      </p>
    </div>
  )
}

export default Footer;
