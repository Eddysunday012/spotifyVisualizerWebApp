import { GenreBreakdown } from "data-visuals";
import { DependenciesContext } from "dependencies-context";
import React from "react";

function App(): JSX.Element {
  const GenreBreakdownInfo = {
    genreNames: ["k-pop", "hip-hop", "huh", "j-pop", "fire"],
    genreValues: [17, 15, 12, 13, 14],
  };
  return (
    <>
      <DependenciesContext.Provider value={{ GenreBreakdownInfo }}>
        <GenreBreakdown />
      </DependenciesContext.Provider>
    </>
  );
}

export default App;
