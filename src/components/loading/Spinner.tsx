import React from "react";

/**
 * A functional component that renders a loading spinner.
 *
 * @returns {JSX.Element} A JSX element representing a spinner, 
 * which is a blue rotating circle.
*/
const Spinner: React.FC = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center my-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default Spinner;