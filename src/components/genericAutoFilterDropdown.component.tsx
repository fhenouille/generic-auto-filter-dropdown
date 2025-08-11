import React, { useState, type FunctionComponent } from "react";

interface Planet {
  name: string;
  diameter_km: number;
}

const planets: Planet[] = [
  { name: "Mercury", diameter_km: 4879 },
  { name: "Venus", diameter_km: 12104 },
  { name: "Earth", diameter_km: 12742 },
  { name: "Mars", diameter_km: 6779 },
  { name: "Jupiter", diameter_km: 139820 },
  { name: "Saturn", diameter_km: 116460 },
  { name: "Uranus", diameter_km: 50724 },
  { name: "Neptune", diameter_km: 49244 },
];

export const GenericAutoFilterDropdown: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  const filteredOptions = planets.filter(
    (planet) =>
      inputValue && planet.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setDropdownIsVisible(true);
  };

  const handleSelect = (option: Planet) => {
    setInputValue(option.name);
    setDropdownIsVisible(false);
  };

  return (
    <div className="generic-select">
      <input
        type="text"
        placeholder={"Enter a Planet"}
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className={`generic-dropdown ${dropdownIsVisible ? "visible" : ""}`}>
        {filteredOptions.map((option) => {
          return (
            <div
              className="generic-option"
              key={option.name}
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
