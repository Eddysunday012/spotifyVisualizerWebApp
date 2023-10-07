import { GenreBreakdown } from "data-visuals";
import { DependenciesContext } from "dependencies-context";
import React from "react";

function App(): JSX.Element {
  const GenreBreakdownInfo = { bruh: "bruh" };
  const data = [
    { axis: "Axis 1", value: 5 },
    { axis: "Axis 2", value: 8 },
    { axis: "Axis 3", value: 9 },
    { axis: "Axis 4", value: 9 },
    { axis: "Axis 5", value: 5 },
  ];
  return (
    <>
      <DependenciesContext.Provider value={GenreBreakdownInfo}>
        <GenreBreakdown />
      </DependenciesContext.Provider>
    </>
  );
}

export default App;
