import { GenreBreakdown } from "data-visuals";
import { DependenciesContext } from "dependencies-context";
import React from "react";

function App(): JSX.Element {
  const GenreBreakdownInfo_1 = {
    genreNames: ["k-pop", "hip-hop", "huh", "j-pop", "fire"],
    genreValues: [17, 15, 12, 13, 14],
  };
  const GenreBreakdownInfo_2 = {
    genreNames: ["Hoo", "Hee", "Ha", "Ha", "Bruh"],
    genreValues: [13, 18, 1, 7, 14],
  };
  const GenreBreakdownInfo_3 = {
    genreNames: ["Ethan", "Emery", "Dad", "Mom", "Grandma"],
    genreValues: [4, 15, 3, 3, 12],
  };

  const GenreBreakdownInfo = {
    month: GenreBreakdownInfo_1,
    year: GenreBreakdownInfo_2,
    allTime: GenreBreakdownInfo_3,
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
