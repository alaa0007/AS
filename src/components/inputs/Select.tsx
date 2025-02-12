import React from "react";

interface SelectProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  defaultValue?: string;
  className?: string;
}

/**
 * A functional component that renders a customizable select input.
 *
 * @param {Object} props - The props object.
 * @param {{ value: string; label: string }[]} props.options - An array of option objects for the select input.
 * @param {function} props.onChange - Callback function triggered when the selected option changes.
 * @param {string} [props.defaultValue] - The default value for the select input.
 * @param {string} [props.className] - Additional class names for styling the select input.
 *
 * @returns {JSX.Element} A JSX element representing the select input.
*/
const Select: React.FC<SelectProps> = ({ options, onChange, defaultValue, className }) => {
  //RENDER
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      defaultValue={defaultValue}
      className={`border rounded-lg p-2 flex-1 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

//EXPORT
export default Select;