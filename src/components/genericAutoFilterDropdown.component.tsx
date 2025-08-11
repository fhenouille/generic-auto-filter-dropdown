import React, { useState, type JSX } from "react";

interface GenericAutoFilterDropdownProps<T> {
  listOfData: T[];
  keyLabel: keyof T;
  placeholder: string;
  valueChange: (selected: T | undefined) => void;
}
export const GenericAutoFilterDropdown = <T,>({
  listOfData,
  keyLabel,
  placeholder,
  valueChange,
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
    valueChange(undefined);
  };

  const handleSelect = (option: T) => {
    setInputValue(option[keyLabel] as string);
    setDropdownIsVisible(false);
    valueChange(option);
  };

  //The matching portion(s) of the option label should be rendered in bold text
  const handleBoldStyleOnOptionLabel = (label: string): JSX.Element => {
    const matchingIndex = label.toLowerCase().indexOf(inputValue.toLowerCase());
    if (matchingIndex === -1 || inputValue === "") {
      return <>{label}</>;
    }

    const before = label.slice(0, matchingIndex);
    const matchingPortion = label.slice(
      matchingIndex,
      matchingIndex + inputValue.length
    );
    const after = label.slice(matchingIndex + inputValue.length);

    return (
      <>
        {before}
        <strong>{matchingPortion}</strong>
        {handleBoldStyleOnOptionLabel(after)}
      </>
    );
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
              onClick={() => {
                handleSelect(option);
              }}
            >
              {handleBoldStyleOnOptionLabel(option[keyLabel] as string)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
