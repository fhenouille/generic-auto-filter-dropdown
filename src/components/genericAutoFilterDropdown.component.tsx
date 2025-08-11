import React, { useState } from "react";

interface GenericAutoFilterDropdownProps<T> {
  listOfData: T[];
  keyLabel: keyof T;
  placeholder: string;
}
export const GenericAutoFilterDropdown = <T,>({
  listOfData,
  keyLabel,
  placeholder,
}: GenericAutoFilterDropdownProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  const filteredOptions = listOfData.filter((data: T) => {
    const value = data[keyLabel];
    return (
      inputValue &&
      typeof value === "string" &&
      value.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setDropdownIsVisible(true);
  };

  const handleSelect = (option: T) => {
    setInputValue(option[keyLabel] as string);
    setDropdownIsVisible(false);
  };

  return (
    <div className="generic-select">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className={`generic-dropdown ${dropdownIsVisible ? "visible" : ""}`}>
        {filteredOptions.map((option) => {
          return (
            <div
              className="generic-option"
              key={option[keyLabel] as string}
              onClick={() => handleSelect(option)}
            >
              {option[keyLabel] as string}
            </div>
          );
        })}
      </div>
    </div>
  );
};
