import { GenreBreakdown } from "data-visuals";
import { DependenciesContext } from "dependencies-context";
import React from "react";

function App(): JSX.Element {
  const GenreBreakdownInfo = { bruh: "bruh" };
  return (
    <>
      <DependenciesContext.Provider value={GenreBreakdownInfo}>
        <GenreBreakdown />
      </DependenciesContext.Provider>
    </>
  );
}

export default App;
