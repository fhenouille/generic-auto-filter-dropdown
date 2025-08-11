import { useState, type FunctionComponent } from "react";
import { GenericAutoFilterDropdown } from "./components/genericAutoFilterDropdown.component";

const planets = [
  { name: "Mercury", diameter_km: 4879 },
  { name: "Venus", diameter_km: 12104 },
  { name: "Earth", diameter_km: 12742 },
  { name: "Mars", diameter_km: 6779 },
  { name: "Jupiter", diameter_km: 139820 },
  { name: "Saturn", diameter_km: 116460 },
  { name: "Uranus", diameter_km: 50724 },
  { name: "Neptune", diameter_km: 49244 },
];

const App: FunctionComponent = () => {
  const [selectedPlanet, setSelectedPlanet] = useState("");

  return (
    <>
      <h1>Generic auto-filter dropdown Demo</h1>
      <h2>Planets</h2>
      <p>{`Selected planet : ${selectedPlanet}`}</p>
      <GenericAutoFilterDropdown
        listOfData={planets}
        keyLabel={"name"}
        placeholder={"Enter a Planet"}
        callback={setSelectedPlanet}
      />
    </>
  );
};

export default App;
